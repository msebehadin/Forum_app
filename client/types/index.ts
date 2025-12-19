// types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Answer {
  id: string;
  answer: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  content?: string;
  answers: Answer[];
  user: User;
  createdAt: string;
  updatedAt: string;
}