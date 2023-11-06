export const getRequiredEnvironmentVariables = (): {
   host: string;
   port: string;
   appUrl: string;
   databaseHost: string;
   databasePort: string;
   databaseUser: string;
   databasePassword: string;
   databaseName: string;
} => {
   const host = process.env.HOST;
   if (!host) throw new Error('HOST is not setup');

   const port = process.env.PORT;
   if (!port) throw new Error('PORT is not setup');

   const appUrl = process.env.APP_URL;
   if (!appUrl) throw new Error('APP_URL is not setup');

   const databaseHost = process.env.DATABASE_HOST;
   if (!databaseHost) throw new Error('DATABASE_HOST is not setup');

   const databasePort = process.env.DATABASE_PORT;
   if (!databasePort) throw new Error('DATABASE_PORT is not setup');

   const databaseUser = process.env.DATABASE_USER;
   if (!databaseUser) throw new Error('DATABASE_USER is not setup');

   const databasePassword = process.env.DATABASE_PASSWORD;
   if (!databasePassword) throw new Error('DATABASE_PASSWORD is not setup');

   const databaseName = process.env.DATABASE_DB;
   if (!databaseName) throw new Error('DATABASE_DB is not setup');

   return {
      host,
      port,
      appUrl,
      databaseHost,
      databasePort,
      databaseUser,
      databasePassword,
      databaseName
   }
}