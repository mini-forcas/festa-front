"use client";
import { supabase } from "@/constants/const";
import { QuizType } from "@/types/Quiz";
import React, { useEffect, useState } from "react";

type OptionsType = {
  option_text: string;
};

type QuizAndOptionsType = {
  question: string;
  options: OptionsType[];
};

function page() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<OptionsType[]>([]);
  const [quizzes, setQuizzes] = useState<QuizAndOptionsType[]>();
  function showSelectedQuiz(quiz: QuizAndOptionsType) {
    setQuestion(quiz.question);
    setOptions(quiz.options);
    setShowQuiz(true);
    // TODO：ユーザーが問題に回答できるようにsocketを送信する
  }
  function QuestionPage() {
    return (
      <div>
        <h1 className="underline decoration-sky-500 text-6xl">{question}</h1>
        {options?.map((option, index) => (
          <h1 className="text-4xl" key={index}>
            {index + 1}: {option.option_text}
          </h1>
        ))}
      </div>
    );
  }
  async function getQuiz() {
    try {
      let { data, error } = await supabase
        .from("quizzes")
        .select("question, options!inner(option_text)");
      console.log(data);
      setQuizzes(data);
      if (data === null) return;
    } catch (e) {
      console.log("----ERROR----");
      console.log(e);
      console.log("----ERROR----");
    }
    console.log("--------");
  }
  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <div>
      <h1>問題数：{quizzes?.length}</h1>
      <div className="grid grid-cols-3 gap-3">
        {quizzes?.map((quiz, index) => {
          return (
            <button
              key={quiz.id}
              className="btn w-full h-full"
              onClick={() => showSelectedQuiz(quiz)}
            >
              第{index + 1}問を開始する
            </button>
          );
        })}
      </div>
      {showQuiz ? <QuestionPage /> : <h1>まだだよ〜〜</h1>}
    </div>
  );
}

export default page;
