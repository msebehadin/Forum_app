'use client'

import AnswerForm from '@/components/pages/answerForm'
import AnswerItem from '@/components/pages/answerItem'
import { api } from '@/libs/axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const DetailQuestionPage = () => {
  const params = useParams()
  const id = params.id as string

  const [question, setQuestion] = useState<any>(null) // Using any for flexibility
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Define fetchQuestion function outside useEffect so it can be reused
  const fetchQuestion = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get(`/question/${id}`)
      setQuestion(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [id])

  // Handle when answer is posted successfully
  const handleAnswerPosted = () => {
    // Refetch the question to get updated answers
    fetchQuestion()
  }

  // Handle retry if there's an error
  const handleRetry = () => {
    fetchQuestion()
  }

  if (loading) return <p className="text-center py-10 text-[#7b6f67]">Loading...</p>
  
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="px-5 py-2.5 bg-[#1f6fe5] text-white rounded-full font-semibold hover:bg-[#1a5ec6]"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  if (!question) return <p className="text-center py-10">Question not found</p>

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
      <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7b6f67] mb-3">
          Question
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1f1a17] mb-4">
          {question.title}
        </h1>
        <p className="text-[#5f564f] leading-relaxed whitespace-pre-line">
          {question.description}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 text-[#1f1a17]">
          Answers ({question.answers?.length || 0})
        </h2>

        <div className="space-y-4">
          {!question.answers || question.answers.length === 0 ? (
            <p className="text-[#7b6f67] italic">
              No answers yet. Be the first to answer!
            </p>
          ) : (
            question.answers.map((ans: any) => (
              <AnswerItem
                key={ans.id}
                answer={ans.answer}
                username={ans.user?.username || "Anonymous"}
              />
            ))
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-[#1f1a17]">
          Your Answer
        </h3>
        <AnswerForm questionId={question.id} onAnswerPosted={handleAnswerPosted} />
      </div>
    </div>
  )
}

export default DetailQuestionPage
