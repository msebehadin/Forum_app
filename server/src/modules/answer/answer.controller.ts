import { Request, Response } from "express";
import * as answerService from './answer.service'


export const createAnswer = async (req: any, res: Response) => {
    try {
        const userId = req.user.id
        const questionId = req.params.questionId // Get questionId from params
        const { answer } = req.body
        
        const data = await answerService.createAnswer(questionId, userId, answer)
        res.status(201).json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const getAnswerByQuestion = async (req: any, res: Response) => {
    try {
        const questionId = req.params.questionId // Get questionId from params
        const data = await answerService.getAnswerByQuestion(questionId) // Pass questionId
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const updateAnswer = async (req: any, res: Response) => {
    try {
        const answerId = req.params.id
        const { answer } = req.body // Extract answer from body
        
        const data = await answerService.updateAnswer(answerId, answer) // Pass only answer text
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteAnswer = async (req: any, res: Response) => {
    try {
        const answerId = req.params.id
        const data = await answerService.deleteAnswer(answerId)
        res.json({ message: "Answer deleted successfully", data })
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}