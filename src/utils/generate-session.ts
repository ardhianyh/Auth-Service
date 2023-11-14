import { userRepository } from "../repositories";
import { IUserSession } from "../types";

export const generateSession = async (user_id: string): Promise<IUserSession | Error> => {
   const expirationDate = new Date();
   expirationDate.setHours(expirationDate.getHours() + 1);

   const userSession = await userRepository.insertUserSession(user_id, expirationDate.toISOString());
   return userSession;
}