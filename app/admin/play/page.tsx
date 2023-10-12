"use client";
import { supabase } from "@/constants/const";
import { QuizType } from "@/types/Quiz";
import React, { useEffect, useState } from "react";

function page() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [question, setQuestion] = useState("");
  const [quizzes, setQuizzes] = useState<QuizType[]>();
  function showSelectedQuiz(quizQuestion: string) {
    setQuestion(quizQuestion);
    setShowQuiz(true);
  }
  function QuestionPage() {
    return (
      <div>
        <h1>問題！！</h1>
        <h1 className="underline decoration-sky-500 text-6xl">{question}</h1>
      </div>
    );
  }
  async function getQuiz() {
    let { data, error } = await supabase.from("quizzes").select("*");
    // const { data, error } = await supabase
    //   .from("quizzes")
    //   .select("question, options!inner(option_text)")
    //   .eq("options.quiz_id", "id");
    if (data === null) return;
    // console.log(data);
    setQuizzes(data);
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
              onClick={() => showSelectedQuiz(quiz.question)}
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
