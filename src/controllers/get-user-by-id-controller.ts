import { Request, Response } from "express";
import { userRepository } from "../repositories";

export const GetUserByIdController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const { userId } = req.params as { userId: string };

   const user = await userRepository.getUserById(userId);
   if (user instanceof Error) {
      return res.status(400).send(user.message);
   }

   return res.status(200).send(user);
}