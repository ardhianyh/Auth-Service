import { NextFunction, Request, Response } from "express";
import { getSession } from "../utils";

export const GuestMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<Response | void> => {
   const sessionId = req.cookies.session_id;
   if (sessionId) {
      const session = await getSession(sessionId);
      if (session) {
         return res.redirect('/');
      }
   }

   return next();
}