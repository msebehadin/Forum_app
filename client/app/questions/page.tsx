import QuestionItem from '@/components/pages/questionItem'
import { api } from '@/libs/axios';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface Question{
  id:number;
  title:string;
  user:{
    username:string
  }
}

const QuestionPage = ({user}:Question) => {
  const [questions,setQuestions]=useState<Question[]>([])
  useEffect(()=>{
    api.get('/question')
    .then(res=>setQuestions(res.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      <div>
        <h1>Question</h1>
        <Link href='/questions/ask'>
        Ask Question
        </Link>
        <p>
          Welcome: <span>{user.username}</span>
        </p>
      </div>
      <h2>Question</h2>
      <div>
        {
          questions.map(q=>(
            <QuestionItem key={q.id} id={q.id} title={q.title} username={q.user.username}/>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionPage