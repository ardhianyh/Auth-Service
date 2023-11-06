import { Request, Response } from "express";
import { userRepository } from "../repositories";

export const GetUserController = async (
   _: Request,
   res: Response
): Promise<Response | void> => {

   const result = await userRepository.getUsers();
   return res.status(200).json(result);
}