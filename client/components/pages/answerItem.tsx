interface AnswerItemType {
    answer:string;
    username:string
}

const AnswerItem = ({answer,username}:AnswerItemType) => {
  return (
       <div className="border p-4 mb-3 rounded">
      <p>{answer}</p>
      <p className="text-sm text-gray-500 mt-2">— {username}</p>
    </div>
  )
}

export default AnswerItem