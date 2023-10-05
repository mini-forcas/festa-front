"use client";
import { socket } from "@/constants/const";
import Link from "next/link";
import React from "react";

const CreateQuiz = () => {
  return (
    <div>
      <h1>問題</h1>
      <h1>選択肢1</h1>
      <h1>選択肢2</h1>
      <h1>選択肢3</h1>
      <h1>選択肢4</h1>
      <h2>正解の選択肢：</h2>
      <button className="btn">登録</button>
    </div>
  );
};

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
      <CreateQuiz />
    </div>
  );
}
