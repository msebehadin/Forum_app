'use client'

import AnswerForm from '@/components/pages/answerForm'
import AnswerItem from '@/components/pages/answerItem'
import { api } from '@/libs/axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Question } from '@/types/question'

const DetailQuestionPage = () => {
  const params = useParams()
  const id = params.id as string

  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchQuestion = async () => {
    try {
      const res = await api.get(`/question/${id}`)
      setQuestion(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchQuestion()
}, [id])


  if (loading) return <p className="text-center py-10">Loading...</p>
  if (!question) return <p className="text-center py-10">Question not found</p>

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* Question */}
      <h1 className="text-2xl font-semibold mb-2">
        {question.title}
      </h1>

      <p className="text-gray-600 mb-8">
        {question.description}
      </p>

      {/* Answers */}
      <h2 className="text-lg font-semibold mb-4">
        Answers ({question.answers.length})
      </h2>

      <div className="space-y-4">
        {question.answers.length === 0 && (
          <p className="text-gray-500">No answers yet.</p>
        )}

        {question.answers.map((ans) => (
          <AnswerItem
            key={ans.id}
            answer={ans.answer}
            username={ans.user.username}
          />
        ))}
      </div>

      {/* Answer Form */}
      <div className="mt-10">
        <AnswerForm questionId={question.id} />
      </div>
    </div>
  )
}

export default DetailQuestionPage
