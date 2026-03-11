"use client";

import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  title: string;
  username: string;
}

const QuestionItem = ({ id, title, username }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/questions/${id}`)}
      className="group flex items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white/80 px-4 py-5 shadow-sm hover:shadow-md hover:border-white cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-[#f1e7dc] text-[#7b6f67]">
            {username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold text-[#1f1a17] group-hover:text-[#1f6fe5] transition-colors">
            {title}
          </p>
          <p className="text-sm text-[#6a605a]">Asked by {username}</p>
        </div>
      </div>

      <ChevronRight className="text-[#b9b1ab] group-hover:text-[#1f6fe5]" />
    </div>
  );
};

export default QuestionItem;
