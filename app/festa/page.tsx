"use client";
import React from "react";
import { io } from "socket.io-client";

function page() {
  const host = "http://localhost";
  const port = 5000;
  const socket = io(`${host}:${port}`);
  socket.on("connection", () => console.log("connect"));
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
      <button className="btn" onClick={() => submitAnswer(2)}>2</button>
      <button className="btn" onClick={() => submitAnswer(3)}>3</button>
      <button className="btn" onClick={() => submitAnswer(4)}>4</button>
    </div>
  );
}

export default page;
