import { Request, Response } from "express";
import { userRepository } from "../repositories";
import { generateSession, requestValidation } from "../utils";
import path from "path";

export const AuthVerifyEmailController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const { token } = req.params as { token: string }

   const validationErros = await requestValidation([
      {
         name: 'token',
         value: token,
         rule: 'required'
      }
   ]);

   if (validationErros.length > 0) {
      return res.status(400).send({ errors: validationErros });
   }

   const userToken = await userRepository.getUserToken(token);
   if (!userToken) {
      return res.status(400).send('Invalid Token!');
   }

   if (userToken instanceof Error) {
      return res.status(400).send(userToken.message);
   }

   await userRepository.removeUserToken(token);

   const verifiedUser = await userRepository.verifiedUser(userToken.user_id);
   if (verifiedUser instanceof Error) {
      return res.status(400).send(verifiedUser.message);
   }

   const userSession = await generateSession(userToken.user_id);
   if (userSession instanceof Error) {
      return res.status(400).send(userSession.message);
   }

   const rootDirectory = path.resolve('./');

   res.cookie('session_id', userSession.id);
   return res.sendFile(rootDirectory + '/src/templates/verified.html');
}