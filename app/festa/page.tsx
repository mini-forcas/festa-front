"use client";
import React, { useEffect, useState } from "react";
import { socket, supabase } from "@/constants/const";
import { QuizChoiceType, QuizType } from "@/types/Quiz";

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
  const [myAnswer, setMyAnswer] = useState<number>();
  const [user, setUser] = useState<User[]>([]);

  socket.on("connection", () => console.log("connect"));
  socket.on("receiveAnswer", (ans: string) => {
    setCorrectAnswer(ans);
  });
  // send message to server
  function submitAnswer(ans: number) {
    socket.emit("submitAnswer", ans);
    setMyAnswer(ans);
  }
  const fetchAllQuizzes = async () => {
    const { data, error } = await supabase.from("quizzes").select();
    if (data === null) return;
    setQuiz(data);
  };
  const fetchChoiceByQuiz = async () => {
    let { data } = await supabase
      .from("options")
      .select("*")
      // TODO idを固定にしている。任意のquiz_idに基づいて取得したい。
      .eq("quiz_id", "10");
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
      <h1>{user[0]?.name}</h1>
      <h1>第1問</h1>
      <h2>{quiz[quiz.length - 1]?.question}</h2>
      <div>
        {choices.map((choice) => {
          {
            /* TODO クリックすると管理者に選択した答えが送信される */
          }
          return (
            <div key={choice.id}>
              <button className="btn" onClick={() => submitAnswer(choice.id)}>
                {choice.option_text}
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="text-white">自分の答え：</h3>
      <h3 className="text-white">{myAnswer}</h3>
      <h3 className="text-white">正解：</h3>
      <h3 className="text-white">{correctAnswer}</h3>
    </div>
  );
}

export default page;
