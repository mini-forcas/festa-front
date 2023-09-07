"use client";
import { socket } from "@/constants/const";
import Link from "next/link";
import React from "react";

export default function page() {
  function showAnswer() {
    socket.emit("showAnswer", { answer: 4 });
  }
  return (
    <div>
      <Link className="btn" href="/admin/create">
        クイズ新規作成ボタン
      </Link>
      {/* TODO これをクリックするとクライアントに回答が表示される */}
      <button className="btn bg-teal-300" onClick={showAnswer}>
        回答
      </button>
    </div>
  );
}
