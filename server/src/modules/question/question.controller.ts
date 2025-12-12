import { Request, Response } from "express";
import * as service from './question.service'

export const createQuestion = async (req: any, res: Response) => {
    try {
        const userId = req.user.id
        const data = await service.createQuestion(userId, req.body)
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const getAllQuestion = async (req: any, res: Response) => {
    try {
        const data = await service.getAllQuestion();
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
} 

export const getQuestion = async (req: any, res: Response) => {
    try {
        const data = await service.getQuestionId(req.params.id)
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const updateQuestion = async (req: any, res: Response) => {
    const updateData = req.body;
    try {
        const data = await service.updateQuestion(req.params.id, updateData);
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteQuestion = async (req: any, res: Response) => {
    try {
        const data = await service.deleteQuestion(req.params.id);
        res.json(data)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}