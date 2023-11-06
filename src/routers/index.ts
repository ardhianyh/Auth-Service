import { Request, Response, Router } from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";

const router = Router();
router.get('/', (_: Request, res: Response) => {
   res.send('hello world');
})

router.use('/auth', authRouter);
router.use('/users', userRouter);

export const route = router;