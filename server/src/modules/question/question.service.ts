
import { prisma } from "../../config/db";
export const createQuestion = async (userId: number, data: any) => {
  return await prisma.question.create({
    data: {
      title: data.title,
      description: data.description,
      userId,
    },
  });
};
export const getAllQuestion = async () => {
  return await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { username: true } },
    },
  });
};
export const getQuestionId = async (id: string) => {
  const question = await prisma.question.findUnique({
    where: { id:Number(id) },
    include: {
      user: { select: { username: true } },
      answers: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { username: true } },
        },
      },
    },
  });
  return question;
};
export const updateQuestion = async (id: number, userId: number, data: any) => {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Question not found");
  }
  if (existing.userId !== userId) {
    throw new Error("Forbidden");
  }
  const updateQuestion = await prisma.question.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
    },
  });
  return updateQuestion
};
export const deleteQuestion = async (id: number, userId: number) => {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Question not found");
  }
  if (existing.userId !== userId) {
    throw new Error("Forbidden");
  }
  return await prisma.question.delete({
    where: { id }
  })
}
