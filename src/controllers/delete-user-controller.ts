import { Request, Response } from "express";
import { userRepository } from "../repositories";

export const DeleteUserController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const { userId } = req.params as { userId: string };

   const deleteUser = await userRepository.deleteUser(userId);
   if (deleteUser instanceof Error) {
      return res.status(400).send(deleteUser.message);
   }

   return res.status(200).send(deleteUser);
}