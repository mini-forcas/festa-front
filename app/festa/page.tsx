"use client";
import React from "react";
import { io } from "socket.io-client";

function page() {
  const host = "http://localhost";
  const port = 5000;
  const socket = io(`${host}:${port}`);
  socket.on("connection", () => console.log("connect"));
  // send message to server
  function submitMessage() {
    let counter = 0;
    socket.emit("yyy", { message: `client message ${counter++}` });
  }
  return (
    <div>
      {/* TODO クリックすると管理者に選択した答えが送信される */}
      <button className="btn" onClick={() => submitMessage()}>
        1
      </button>
      <button className="btn">2</button>
      <button className="btn">3</button>
      <button className="btn">4</button>
    </div>
  );
}

export default page;
