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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67] mb-2">
            Community feed
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1f1a17]">
            Questions from the community
          </h1>
          <p className="text-[#6a605a] mt-2">
            Browse recent questions and share what you know.
          </p>
        </div>
        <Link
          href="/questions/ask"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1f6fe5] text-white font-semibold hover:bg-[#1a5ec6] transition-colors"
        >
          Ask a question
        </Link>
      </div>

      <div className="space-y-4">
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
