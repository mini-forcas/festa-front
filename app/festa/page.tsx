"use client";
import React, { useEffect, useState } from "react";
import { socket, supabase } from "@/constants/const";
import { QuizChoiceType, QuizType } from "@/types/Quiz";

type AnsType = {
  answer: string | number;
};
type User = {
  id: string;
  socket_id: string;
  name: string;
  created_at: string;
};

function page() {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [choices, setChoices] = useState<QuizChoiceType[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | number>();
  const [myAnswer, setMyAnswer] = useState<string>();
  const [user, setUser] = useState<User[]>([]);

  socket.on("connection", () => console.log("connect"));
  socket.on("receiveAnswer", (ans: AnsType) => {
    setCorrectAnswer(ans.answer);
  });
  // send message to server
  function submitAnswer(ans: string) {
    socket.emit("submitAnswer", ans);
    setMyAnswer(ans);
  }
  const fetchAllQuizzes = async () => {
    const { data, error } = await supabase.from("quizzes").select();
    if (data === null) return;
    setQuiz(data);
    console.log(`QUIZ→${data[0].correct_option_id}`);
  };
  const fetchChoiceByQuiz = async () => {
    let { data } = await supabase
      .from("options")
      .select("*")
      // TODO
      .eq("quiz_id", "8");
    return data as QuizChoiceType[];
  };
  useEffect(() => {
    fetchAllQuizzes();
    (async () => {
      setChoices(await fetchChoiceByQuiz());
    })();
    (async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const params = queryParams.get("userId");
      if (params !== null) {
        const data = await getUserById(params);
        if (data != undefined) {
          setUser(data);
        }
      }
    })();
  }, []);
  const getUserById = async (param: string) => {
    let { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("socket_id", param);
    return data as User[];
  };

  return (
    <div>
      <div>
        {choices.map((choice) => {
          {
            /* TODO クリックすると管理者に選択した答えが送信される */
          }
          return (
            <div key={choice.id}>
              <button
                className="btn"
                onClick={() => submitAnswer(choice.option_text)}
              >
                {choice.option_text}
              </button>
            </div>
          );
        })}
      </div>
      <h3>{user[0]?.name}</h3>
      <h3 className="text-white">自分の答え：</h3>
      <h3 className="text-white">{myAnswer}</h3>
      <h3 className="text-white">正解：</h3>
      <h3 className="text-white">{correctAnswer}</h3>
    </div>
  );
}

export default page;
