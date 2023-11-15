import { Request, Response } from "express";
import { userRepository } from "../repositories";

export const AuthLogoutController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const sessionId = req.cookies.session_id as string;
   await userRepository.invokeUserSession(sessionId);

   res.clearCookie('session_id');
   return res.redirect('/login');
}