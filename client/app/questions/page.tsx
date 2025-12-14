"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/router";
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
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Steps to write a good question
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected.</li>
              <li>Review your question and post it.</li>
            </ul>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-1">
              Ask a public question
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Go to Question page
            </p>

            <div className="space-y-6">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
                placeholder="Question Description..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Posting..." : "Post Your Question"}
              </Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default AskQuestionPage;
