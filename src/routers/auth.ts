import { Router } from "express";
import { AuthGoogleController, AuthLogoutController, AuthVerifyEmailController, InsertUserController } from "../controllers";
import { AuthLoginController } from "../controllers/auth-login-controller";
import passport from 'passport';

const router = Router();

router.get('/verify/:token', AuthVerifyEmailController);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  AuthGoogleController
)

router.post('/login', AuthLoginController);
router.post('/register', InsertUserController);
router.post('/logout', AuthLogoutController);

export const authRouter = router;