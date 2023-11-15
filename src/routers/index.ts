import { Request, Response, Router } from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import path from "path";
import { AuthMiddleware, GuestMiddleware } from "../middleware";

const rootDirectory = path.resolve('./');

const router = Router();
router.get(
   '/',
   AuthMiddleware,
   (_: Request, res: Response) => {
      res.sendFile(rootDirectory + '/src/templates/dashboard.html');
   }
);

router.get(
   '/login',
   GuestMiddleware,
   (_: Request, res: Response) => {
      res.sendFile(rootDirectory + '/src/templates/login.html');
   }
);

router.get(
   '/register',
   GuestMiddleware,
   (_: Request, res: Response) => {
      res.sendFile(rootDirectory + '/src/templates/register.html');
   }
);

router.get(
   '/profile',
   AuthMiddleware,
   (_: Request, res: Response) => {
      res.sendFile(rootDirectory + '/src/templates/profile.html');
   }
);

router.get(
   '/reset-password',
   AuthMiddleware,
   (_: Request, res: Response) => {
      res.sendFile(rootDirectory + '/src/templates/reset-password.html');
   }
);

router.use('/auth', authRouter);
router.use('/users', userRouter);

export const route = router;