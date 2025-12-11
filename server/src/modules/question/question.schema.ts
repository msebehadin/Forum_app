import {z} from 'zod'
export const createQuestionSchema=z.object({
    body:z.object({
        title:z.string().min(5,'title must be at least 5 characters'),
        description:z.string().min(10)
    })
})
export const  createAnswerSchema=z.object({
    body:z.object({
        body:z.string().min(2),
    })
})
export type QuestionInput=z.infer<typeof createQuestionSchema>
export type AnswerInput=z.infer<typeof createAnswerSchema>