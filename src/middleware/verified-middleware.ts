import { NextFunction, Request, Response } from "express";
import { getSession } from "../utils";
import { userRepository } from "../repositories";


export const VerifiedMiddleware = async (
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

   const isVerifiedUser = await userRepository.getVerifiedUser(session.user_id);
   if (!isVerifiedUser) {
      return res.status(403).send('Please Verify your Email!');
   }

   return next();
}