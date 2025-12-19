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

  if (loading) return <p className="text-center py-10">Loading...</p>
  
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  if (!question) return <p className="text-center py-10">Question not found</p>

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Question */}
      <h1 className="text-2xl font-semibold mb-2">
        {question.title}
      </h1>

      <p className="text-gray-600 mb-8 whitespace-pre-line">
        {question.description}
      </p>

      {/* Answers */}
      <h2 className="text-lg font-semibold mb-4">
        Answers ({question.answers?.length || 0})
      </h2>

      <div className="space-y-4">
        {!question.answers || question.answers.length === 0 ? (
          <p className="text-gray-500 italic">No answers yet. Be the first to answer!</p>
        ) : (
          question.answers.map((ans: any) => (
            <AnswerItem
              key={ans.id}
              answer={ans.answer}
              username={ans.user?.username || 'Anonymous'}
              
            />
          ))
        )}
      </div>

      {/* Answer Form */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
        <AnswerForm 
          questionId={question.id} 
          onAnswerPosted={handleAnswerPosted} 
        />
      </div>
    </div>
  )
}

export default DetailQuestionPage