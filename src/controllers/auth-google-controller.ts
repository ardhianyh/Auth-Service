import { Request, Response } from "express";
import { IGoogleUser, ISource, IUser } from "../types";
import { userRepository } from "../repositories";
import { generateSession } from "../utils";

export const AuthGoogleController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const googleUser = req.user as IGoogleUser;

   const user: IUser = {
      name: `${googleUser.name.givenName} ${googleUser.name.familyName}`,
      email: googleUser.email,
      source: ISource.GOOGLE,
   }

   const userEmail = await userRepository.getUserByEmail(user.email);
   let user_id: string;

   if (userEmail instanceof Error) {
      return res.status(400).send(userEmail.message);
   } else if (!userEmail) {
      const userUpsert = await userRepository.insertGoogleUser(user);
      if (userUpsert instanceof Error) {
         return res.status(400).send(userUpsert.message);
      }

      const verifiedUser = await userRepository.verifiedUser(userUpsert.id);
      if (verifiedUser instanceof Error) {
         return res.status(400).send(verifiedUser.message);
      }

      user_id = userUpsert.id;
   } else {
      user_id = userEmail.id;
   }

   const userSession = await generateSession(user_id);
   if (userSession instanceof Error) {
      return res.status(400).send(userSession.message);
   }

   res.cookie('session_id', userSession.id);
   return res.redirect('/');
}