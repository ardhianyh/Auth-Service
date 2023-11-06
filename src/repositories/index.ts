import { connectPostgres } from "../config/database"
import { getRequiredEnvironmentVariables } from "../utils/get-required-environment-variables";
import { UserRepository } from "./user-repository";

export let userRepository: UserRepository;

export const initializeRepositories = async (): Promise<void> => {
   const requiredVariables = getRequiredEnvironmentVariables();
   const pgDatabase = await connectPostgres({
      host: requiredVariables.databaseHost,
      port: +(requiredVariables.databasePort),
      user: requiredVariables.databaseUser,
      password: requiredVariables.databasePassword,
      database: requiredVariables.databaseName
   });

   if (pgDatabase instanceof Error) {
      throw new Error(pgDatabase.message);
   }

   userRepository = new UserRepository(pgDatabase);
}