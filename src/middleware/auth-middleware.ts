import { NextFunction, Request, Response } from "express";
import { getSession } from "../utils";

export const AuthMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const sessionId = req.cookies.session_id;
   if (!sessionId) {
      return res.status(403).send('Forbidden Access!');
   }

   const session = await getSession(sessionId);
   if (!session) {
      res.clearCookie('session_id');
      return res.status(403).send('Invalid Session! please re-login');
   }

   const currentTime = new Date().getTime();
   const expiredTime = new Date(session.expired_at).getTime();

   if (currentTime >= expiredTime) {
      res.clearCookie('session_id');
      return res.status(403).send('Session Expired! Please re-login');
   }

   return next();
}