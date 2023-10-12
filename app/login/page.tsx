"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { socket, supabase } from "@/constants/const";

function Login() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  socket.on("tokenId", (tokenId) => localStorage.setItem("socket_id", tokenId));
  async function submitUser() {
    if (name.length < 1) alert("名前は1文字以上を入力してください");
    const socket_id = localStorage.getItem("socket_id");
    if (socket_id === null) {
      // tokeIdを取得する処理
      console.log("ソケットIDがNULLだよ");
    }
    // ニックネームとSockerIDをテーブルにInsert
    const { error } = await supabase.from("users").insert({ socket_id, name });
    router.push(`./festa/${socket_id}`);
  }
  return (
    <div className="grid justify-center items-center m-auto gap-4">
      <div className="flex justify-center">
        <h1>クイズ！FORCASの部屋！</h1>
      </div>
      <div className="mt-20">
        <input
          type="text"
          placeholder="ニックネームを入力してね"
          className="input w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button className="btn" onClick={submitUser}>
          クイズに参加する
        </button>
      </div>
    </div>
  );
}

export default Login;
