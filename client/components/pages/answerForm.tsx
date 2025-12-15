import { api } from "@/libs/axios"
import { useState } from "react"


const AnswerForm = ({questionId}:{questionId:number}) => {
    const [answer,setAnswer]=useState('')
    const submit= async ()=>{
await api.post(`/answer/${questionId}`,{answer})
    window.location.reload()
    }
  return (
   <div className="mt-6">
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="w-full border p-3 rounded"
        rows={4}
      />
      <button onClick={submit} className="btn-primary mt-3">
        Post Answer
      </button>
    </div>
  )
}

export default AnswerForm