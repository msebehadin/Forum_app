import { Router } from "express"
import * as controller from './answer.controller'
import { authMiddleware } from "../../middleware/auth.middleware"

const router = Router()

router.post('/:questionId', authMiddleware, controller.createAnswer)
router.get('/:questionId', controller.getAnswerByQuestion)
router.put('/:questionId', controller.updateAnswer)
router.delete('/:questionId', controller.deleteAnswer)

export default router
