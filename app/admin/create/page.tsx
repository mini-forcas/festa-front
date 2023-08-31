"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import { io } from "socket.io-client";
type Inputs = {
  title: string;
  exampleRequired: string;
  dateRequired: string;
  people: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
const host = "http://localhost";
const port = 5000;
const socket = io(`${host}:${port}`);

const showAnswer = () => {
  socket.emit("showAnswer");
};

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const test = async () => {
    const { error } = await supabase
      .from("quizzes")
      .insert({ admin_id: 1, question: "test", correct_option_id: 1 });
  };

  console.log(watch("title"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>クイズイベントのタイトル:必須</h2>
      <input defaultValue="0" {...register("title")} />
      <h3>予定参加人数:</h3>
      <select {...register("people", { required: true })}>
        <option value="0">10名以下</option>
        <option value="1">11~50名</option>
        <option value="2">51~100名</option>
        <option value="3">100名以上</option>
      </select>
      <h3>予定開催日時:</h3>
      <input type="date" {...register("dateRequired", { required: true })} />
      {errors.dateRequired && <span>Date field is required</span>}

      <input type="submit" />
      <button className="btn" onClick={() => test()}>
        CREATE
      </button>
      <button className="btn" onClick={showAnswer}>
        答えを表示する
      </button>
    </form>
  );
}
