import { Request, Response } from "express";
import { userRepository } from "../repositories";
import { IEditableUser } from "../types";
import { requestValidation } from "../utils";

export const UpdateUserController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const { userId } = req.params as { userId: string };
   const user = req.body as IEditableUser;

   const validationErros = await requestValidation([
      {
         name: 'name',
         value: user.name,
         rule: 'required'
      },
      {
         name: 'email',
         value: user.email,
         rule: 'email'
      }
   ]);

   if (validationErros.length > 0) {
      return res.status(400).send({ errors: validationErros });
   }

   const updateUser = await userRepository.updateUser(userId, user);
   if (updateUser instanceof Error) {
      return res.status(400).send(updateUser.message);
   }

   return res.status(200).send(updateUser);
}