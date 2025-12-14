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
      className="flex items-center justify-between py-6 border-b cursor-pointer hover:bg-gray-50 px-2"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Avatar>
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>

        {/* Text */}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{username}</p>
        </div>
      </div>

      <ChevronRight className="text-gray-400" />
    </div>
  );
};

export default QuestionItem;
