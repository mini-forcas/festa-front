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
        create画面に遷移する
      </Link>
    </div>
  );
}
