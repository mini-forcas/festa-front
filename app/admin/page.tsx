import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link className="btn" href="/admin/create">
        クイズ新規作成ボタン
      </Link>
      {/* TODO これをクリックするとクライアントに回答が表示される */}
      <button className="btn bg-teal-300">回答</button>
    </div>
  );
}
