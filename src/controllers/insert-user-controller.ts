import { Request, Response } from "express";
import { ISource, IUser } from "../types/user";
import { userRepository } from "../repositories";
import bcrypt from 'bcrypt';
import { emailService, generateToken, requestValidation } from "../utils";

export const InsertUserController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const { name, email, password } = req.body as { name: string, email: string, password: string }

   const validationErros = await requestValidation([
      {
         name: 'name',
         value: name,
         rule: 'required'
      },
      {
         name: 'email',
         value: email,
         rule: 'email'
      },
      {
         name: 'password',
         value: password,
         rule: 'password'
      }
   ]);

   if (validationErros.length > 0) {
      return res.status(400).send({ errors: validationErros });
   }

   const user: IUser = {
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      source: ISource.WEB,
   }

   const userUpsert = await userRepository.insertUser(user);
   if (userUpsert instanceof Error) {
      return res.status(400).send(userUpsert.message);
   }

   const token = await generateToken(150);
   const expirationDate = new Date();
   expirationDate.setHours(expirationDate.getHours() + 1);

   const insertedToken = await userRepository.insertUserToken({
      user_id: userUpsert.id,
      token: token,
      expired_at: expirationDate.toISOString()
   });

   if (insertedToken instanceof Error) {
      return res.status(400).send(insertedToken.message);
   }

   const sendEmail = await emailService.sendVerificationEmail(email, insertedToken);
   if (!sendEmail) console.log('Send Email Verification Error!');

   return res.status(201).send('Email Verification Sent!');
}