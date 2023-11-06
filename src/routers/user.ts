import { Router } from "express";
import { DeleteUserController, GetUserByIdController, GetUserController, InsertUserController, UpdateUserController } from "../controllers";
import { AuthMiddleware, VerifiedMiddleware } from "../middleware";

const router = Router();

router.get('/',
   [
      AuthMiddleware,
      VerifiedMiddleware
   ],
   GetUserController
);
router.get('/:userId', GetUserByIdController);
router.post('/', InsertUserController);
router.put('/:userId', UpdateUserController);
router.delete('/:userId', DeleteUserController);

export const userRouter = router;