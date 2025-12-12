import { Router } from "express";
import * as controller from './answer.controller'
import { authMiddleware } from "../../middleware/auth.middleware";
const router=Router();
router.post('/',authMiddleware,controller.createAnswer)

router.get('/:id',controller.getAnswerByQuestion)
router.put('/:id',authMiddleware,controller.updateAnswer)
router.delete('/:id',authMiddleware,controller.deleteAnswer)
export default router