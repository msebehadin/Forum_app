import { Router } from "express";
import * as controller from './answer.controller'
import { authMiddleware } from "../../middleware/auth.middleware";
const router=Router();
router.post('/',authMiddleware,controller.createAnswer)

router.get('/:questionId',controller.getAnswerByQuestion)
router.put('/:questionId',authMiddleware,controller.updateAnswer)
router.delete('/:questionId',authMiddleware,controller.deleteAnswer)
export default router