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
    <div className="mt-6 space-y-3">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full rounded-2xl border border-orange-100 bg-white/90 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#ffb66d]"
        rows={5}
        placeholder="Write your answer..."
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={submit}
        className="bg-[#1f6fe5] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#1a5ec6] disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Answer"}
      </button>
    </div>
  )
}

export default AnswerForm
