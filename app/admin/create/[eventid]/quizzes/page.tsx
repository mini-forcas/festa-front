"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

function page() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const submit = async () => {
    const { data } = await supabase
      .from("quizzes")
      .insert([{ admin_id: 1, question: question, correct_option_id: 1 }])
      .select()
      .single();

    await supabase.from("options").insert([
      { quiz_id: data.id, option_text: option1 },
      { quiz_id: data.id, option_text: option2 },
    ]);
  };

  return (
    <div className="mt-10">
      <div className="form-control w-full max-w-xs">
        <h3>問題文</h3>
        <textarea
          className="textarea textarea-bordered"
          placeholder="問題文を入力してください"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
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
