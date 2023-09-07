"use client";
import React, { useEffect, useState } from "react";
import { socket, supabase } from "@/constants/const";

type DataType = {
  id: number;
  admin_id: number;
  question: string;
  correct_option_id: number;
  created_at: string;
  updated_at: string;
};
type OptionsType = {
  id: number;
  quiz_id: number;
  option_text: string;
  created_at: string;
  updated_at: string;
};

function page() {
  const [data, setData] = useState<DataType[]>([]);
  const [options, setOptions] = useState<OptionsType[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [myAnswer, setMyAnswer] = useState<string>();

  socket.on("connection", () => console.log("connect"));
  socket.on("receiveAnswer", () => {
    setAnswer(data[0].correct_option_id);
  });
  // send message to server
  function submitAnswer(ans: string) {
    socket.emit("submitAnswer", ans);
    setMyAnswer(ans);
  }
  const fetch = async () => {
    const { data, error } = await supabase.from("quizzes").select();
    if (data === null) return;
    setData(data);
    console.log(data[7]);
  };
  const fetchEq = async () => {
    let { data } = await supabase
      .from("options")
      .select("*")
      .eq("quiz_id", "8");
    return data as OptionsType[];
  };
  useEffect(() => {
    fetch();
    (async () => {
      setOptions(await fetchEq());
    })();
  }, []);

  return (
    <div>
      <div>
        {options.map((option) => {
          {
            /* TODO クリックすると管理者に選択した答えが送信される */
          }
          return (
            <div key={option.id}>
              <button
                className="btn"
                onClick={() => submitAnswer(option.option_text)}
              >
                {option.option_text}
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="text-white">自分の答え：</h3>
      <h3 className="text-white">{myAnswer}</h3>
      <h3 className="text-white">正解：</h3>
      <h3 className="text-white">{answer}</h3>
    </div>
  );
}

export default page;
