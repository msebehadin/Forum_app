import { prisma } from "../../config/db";


export const createAnswer = async (questionId: string, userId: string, answerText: string) => {
    return await prisma.answer.create({
        data: {
            answer: answerText,
            questionId: Number(questionId),
            userId: Number(userId),
        },
        include: {
            user: {
                select: { username: true },
            },
        },
    });
};

export const getAnswerByQuestion = async (questionId: string) => {
    return await prisma.answer.findMany({
        where: { questionId: Number(questionId) },
        include: {
            user: {
                select: { username: true },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const updateAnswer = async (answerId: string, answerText: string) => {
    return await prisma.answer.update({
        where: { id: Number(answerId) },
        data: { answer: answerText },
        include: {
            user: {
                select: { username: true },
            },
        },
    });
};

export const deleteAnswer = async (answerId: string) => {
    return await prisma.answer.delete({
        where: { id: Number(answerId) }
    });
};

