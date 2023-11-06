import { userRepository } from "../repositories"
import { ISession } from "../types";

export const getSession = async (sessionId: string): Promise<ISession | undefined> => {
   const session = await userRepository.getUserSession(sessionId);
   if (session instanceof Error) {
      return undefined;
   }

   return session;
}