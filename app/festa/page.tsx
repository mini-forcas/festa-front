"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { createClient } from "@supabase/supabase-js";

type DataType = {
  id: number;
  admin_id: number;
  question: string;
  correct_option_id: number;
  created_at: string;
  updated_at: string;
};
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

function page() {
  const host = "http://localhost";
  const port = 5000;
  const socket = io(`${host}:${port}`);
  const [answer, setAnswer] = useState("");
  const [myAnswer, setMyAnswer] = useState<number>();
  const [data, setData] = useState<DataType[]>([]);

  socket.on("connection", () => console.log("connect"));
  socket.on("receiveAnswer", (ans) => {
    console.log(ans.answer);
    setAnswer(ans.answer);
  });
  // send message to server
  function submitAnswer(ans: number) {
    socket.emit("submitAnswer", ans);
    setMyAnswer(ans);
  }
  const fetch = async () => {
    const { data, error } = await supabase.from("quizzes").select();
    if (data === null) return;
    setData(data);
    console.log(data[0]);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div>{data[0]?.id}</div>
      {/* TODO クリックすると管理者に選択した答えが送信される */}
      <button className="btn" onClick={() => submitAnswer(1)}>
        1
      </button>
      <button className="btn" onClick={() => submitAnswer(2)}>
        2
      </button>
      <button className="btn" onClick={() => submitAnswer(3)}>
        3
      </button>
      <button className="btn" onClick={() => submitAnswer(4)}>
        4
      </button>
      <div>
        <h3 className="text-white">自分の答え：</h3>
        <h3 className="text-white">{myAnswer}</h3>
        <h3 className="text-white">正解：</h3>
        <h3 className="text-white">{answer}</h3>
      </div>
    </div>
  );
}

export default page;
