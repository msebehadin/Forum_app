"use client";
import { useEffect, useState } from "react";
import QuestionItem from "@/components/pages/questionItem";
import { api } from "@/libs/axios";

import Link from "next/link";
interface Question {
  id: number;
  title: string;
  user: {
    username: string;
  };
}

const QuestionPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    api
      .get("/question")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
      <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Questions</h1>
        <Link href="/questions/ask" className="bg-blue-400 rounded-2xl p-1.5">
          Ask Question
        </Link>
      </div>

      <div>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            id={q.id}
            title={q.title}
            username={q.user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
