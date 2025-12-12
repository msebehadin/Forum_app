import { Router } from "express";
import * as controller from './question.controller'
import { authMiddleware } from "../../middleware/auth.middleware";
const router=Router();
router.post('/',authMiddleware,controller.createQuestion)
router.get('/',controller.getAllQuestion);
router.get('/:id',controller.getAllQuestion)
router.put('/:id',authMiddleware,controller.updateQuestion)
router.delete('/:id',authMiddleware,controller.deleteQuestion)
export default router