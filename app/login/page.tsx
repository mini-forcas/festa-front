"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  function submitUser() {
    if (name.length < 1) alert("名前は1文字以上を入力してください");
    console.log(name);
    router.push("./festa/1");
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
