interface AnswerItemType {
    answer:string;
    username:string
}

const AnswerItem = ({answer,username}:AnswerItemType) => {
  return (
       <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm">
      <p className="text-[#2e2a27] leading-relaxed">{answer}</p>
      <p className="text-xs uppercase tracking-[0.25em] text-[#7b6f67] mt-4">
        — {username}
      </p>
    </div>
  )
}

export default AnswerItem
