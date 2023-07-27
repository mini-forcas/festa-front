"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  exampleRequired: string;
  dateRequired: string;
  people: string;
};

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
    </form>
  );
}
