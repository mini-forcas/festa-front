"use client";

import { socket } from "@/constants/const";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function page() {
  const params = useParams();
  const [waitFlag, setWaitFlag] = useState(true);
  socket.on("showQuiz", () => {
    setWaitFlag(false);
  });
  return (
    <div>
      <h1>{params.id}</h1>
      {waitFlag ? (
        <div>
          <h1>待機中...ちょっと待ってね</h1>
        </div>
      ) : (
        <div>
          <h1>第一問！！</h1>
        </div>
      )}
    </div>
  );
}

export default page;
