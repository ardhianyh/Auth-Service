import { Router } from "express";
import { DeleteUserController, GetUserByIdController, GetUserController, InsertUserController, UpdateUserController } from "../controllers";
import { AuthMiddleware, VerifiedMiddleware } from "../middleware";

const router = Router();

router.use([
   AuthMiddleware,
   VerifiedMiddleware
]);

router.get('/', GetUserController);
router.get('/:userId', GetUserByIdController);
router.post('/', InsertUserController);
router.put('/:userId', UpdateUserController);
router.delete('/:userId', DeleteUserController);

export const userRouter = router;