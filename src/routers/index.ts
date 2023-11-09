import { Request, Response, Router } from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import path from "path";

const rootDirectory = path.resolve('./');

const router = Router();
router.get('/', (_: Request, res: Response) => {
   res.send('hello world');
});

router.get('/login', (_: Request, res: Response) => {
   res.sendFile(rootDirectory + '/src/templates/login.html');
});

router.get('/register', (_: Request, res: Response) => {
   res.sendFile(rootDirectory + '/src/templates/register.html');
});

router.use('/auth', authRouter);
router.use('/users', userRouter);

export const route = router;