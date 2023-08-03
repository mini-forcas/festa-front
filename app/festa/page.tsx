"use client";
import React, { useState } from "react";
import { io } from "socket.io-client";

function page() {
  const host = "http://localhost";
  const port = 5000;
  const socket = io(`${host}:${port}`);
  const [answer, setAnswer] = useState("");
  const [myAnswer, setMyAnswer] = useState("");

  socket.on("connection", () => console.log("connect"));
  socket.on("receiveAnswer", (ans) => {
    console.log(ans.answer);
    setAnswer(ans.answer);
  });
  // send message to server
  function submitAnswer(ans: number | String) {
    socket.emit("submitAnswer", ans);
  }
  return (
    <div>
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
        <h3 className="text-white">{answer}</h3>
        <h3 className="text-white">正解：</h3>
        <h3 className="text-white">{myAnswer}</h3>
      </div>
    </div>
  );
}

export default page;
