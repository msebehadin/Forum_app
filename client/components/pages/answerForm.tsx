'use client'

import { api } from '@/libs/axios'
import { useState } from 'react'

interface AnswerFormProps {
  questionId: number
  onAnswerPosted: () => void // callback to refresh 
}

const AnswerForm = ({ questionId, onAnswerPosted }: AnswerFormProps) => {
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!answer.trim()) return

    setLoading(true)
    setError(null)

    try {
     const res= await api.post(`/answer/${questionId}`, { answer })
      setAnswer(res.data)
      onAnswerPosted() // trigger refresh in parent
      if(res){
        console.log('the answer correctly posted')
      }
      console.log(res.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'the answer is correctly posted')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="w-full border p-3 rounded"
        rows={4}
        placeholder="Write your answer..."
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={submit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Answer'}
      </button>
    </div>
  )
}

export default AnswerForm
