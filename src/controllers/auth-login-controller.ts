import { Request, Response } from "express";
import { userRepository } from "../repositories";
import { requestValidation } from "../utils";
import bcrypt from 'bcrypt';

export const AuthLoginController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const { email, password } = req.body as { email: string, password: string }

   const validationErros = await requestValidation([
      {
         name: 'email',
         value: email,
         rule: 'email'
      }, {
         name: 'password',
         value: password,
         rule: 'required'
      }
   ]);

   if (validationErros.length > 0) {
      return res.status(400).send({ errors: validationErros });
   }

   const user = await userRepository.getUserByEmail(email);
   if (!user) {
      return res.status(401).send('Invalid Credentials!');
   }

   if (user instanceof Error) {
      return res.status(400).send(user.message);
   }

   const validatePassword = await bcrypt.compare(password, user.password);
   if (!validatePassword) {
      return res.status(401).send('Invalid Credentials!');
   }

   const expirationDate = new Date();
   expirationDate.setHours(expirationDate.getHours() + 1);

   const userSession = await userRepository.insertUserSession(user.id, expirationDate.toISOString());
   if (userSession instanceof Error) {
      return res.status(400).send(userSession.message);
   }

   res.cookie('session_id', userSession.id);
   return res.status(200).send({ session_id: userSession.id });
}