"use client";
import { supabase } from "@/constants/const";
import React, { useState } from "react";

function page() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [correct, setCorrect] = useState<number>();

  const submit = async () => {
    const { data } = await supabase
      .from("quizzes")
      .insert([{ admin_id: 1, question: question, correct_option_id: correct }])
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
        <div className="flex items-center">
          <input
            type="text"
            placeholder="選択肢1"
            className="input input-bordered w-full max-w-xs"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          <input
            type="radio"
            name="radio-1"
            className="radio"
            onChange={() => setCorrect(1)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="選択肢2"
          className="input input-bordered w-full max-w-xs"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <input
          type="radio"
          name="radio-1"
          className="radio"
          onChange={() => setCorrect(2)}
        />
      </div>
      <button className="btn" onClick={() => submit()}>
        送信
      </button>
    </div>
  );
}

export default page;
