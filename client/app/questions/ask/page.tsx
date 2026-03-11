"use client"
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/libs/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const AskQuestionPage = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!title || !description) {
      setError("title and description are required");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      await api.post(
        "/question",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/questions");
    } catch (err: any) {
      setError(err?.response?.data?.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <div className="hero-grid rounded-3xl p-8 lg:p-12 soft-shadow">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67] mb-3">
            Ask with clarity
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1f1a17] mb-4">
            Steps to write a helpful question
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-[#5f564f]">
            <li className="rounded-2xl bg-white/70 border border-white/60 p-4">
              Summarize your problem in a one-line title.
            </li>
            <li className="rounded-2xl bg-white/70 border border-white/60 p-4">
              Describe your problem in more detail.
            </li>
            <li className="rounded-2xl bg-white/70 border border-white/60 p-4">
              Explain what you tried and what you expected.
            </li>
            <li className="rounded-2xl bg-white/70 border border-white/60 p-4">
              Review your question and post it.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-1 text-[#1f1a17]">
            Ask a public question
          </h2>
          <p className="text-center text-sm text-[#7b6f67] mb-6">
            Be specific and share enough detail for a great answer.
          </p>

          <div className="space-y-6">
            <Input
              placeholder="Question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
            />

            <Textarea
              placeholder="Describe your question in detail..."
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white border border-orange-100 focus-visible:ring-2 focus-visible:ring-[#ffb66d]"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-[#1f6fe5] hover:bg-[#1a5ec6] rounded-full px-6"
            >
              {isLoading ? "Posting..." : "Post Your Question"}
            </Button>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default AskQuestionPage;
