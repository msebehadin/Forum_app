import QuestionItem from '@/components/pages/questionItem'
import Link from 'next/link'
import React from 'react'

const QuestionPage = () => {
  return (
    <div>
      <div>
        <Link href='/ask'>
        Ask Question
        </Link>
        <p>
          Welcome: <span></span>
        </p>
      </div>
      <h2>Question</h2>
      <div>
        <QuestionItem id={0} title={''} username={''}/>
      </div>
    </div>
  )
}

export default QuestionPage