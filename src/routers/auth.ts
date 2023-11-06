import { Router } from "express";
import { AuthVerifyEmailController } from "../controllers";
import { AuthLoginController } from "../controllers/auth-login-controller";

const router = Router();

router.get('/verify/:token', AuthVerifyEmailController);
router.post('/login', AuthLoginController);

export const authRouter = router;