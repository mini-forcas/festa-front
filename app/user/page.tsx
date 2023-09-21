"use client";
import { socket, supabase } from "@/constants/const";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  socket.on("tokenId", (tokenId) => setUserId(tokenId));
  const submitUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert([{ socket_id: userId, name: userName }])
      .select();
    router.push(`/festa?userId=${userId}`);
  };
  return (
    <div>
      <h5>あなたの名前を書いてね</h5>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <p>送信してクイズに参加する</p>
      <button className="btn" onClick={() => submitUserData()}>
        送信
      </button>
    </div>
  );
};

export default page;
