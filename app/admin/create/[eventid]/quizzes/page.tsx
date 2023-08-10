"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

function page() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const submit = async () => {
    console.log("GOO");
    const { error } = await supabase.from("options").insert([
      { quiz_id: 1, option_text: option1 },
      { quiz_id: 1, option_text: option2 },
    ]);
  };
  return (
    <div className="mt-10">
      <div className="form-control w-full max-w-xs">
        <input
          type="text"
          placeholder="選択肢1"
          className="input input-bordered w-full max-w-xs"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <input
          type="text"
          placeholder="選択肢2"
          className="input input-bordered w-full max-w-xs"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
      </div>
      <button className="btn" onClick={() => submit()}>
        送信
      </button>
    </div>
  );
}

export default page;
