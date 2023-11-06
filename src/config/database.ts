import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import { IDatabase } from "../types";

export const connectPostgres = async (
   config: PoolConfig
): Promise<IDatabase | Error> => {
   const pool = new Pool(config);

   return new Promise((resolve) => {
      pool.connect((error, _, done) => {
         done();
         if (error) {
            resolve(new Error(error.message));
            return;
         }

         const database: IDatabase = {
            query: <T extends QueryResultRow>(
               queryText: string,
               parameters: Array<unknown>
            ): Promise<QueryResult<T> | Error> => {
               return new Promise((resolve) => {
                  pool.query<T>(queryText, parameters, (error: Error, result) => {
                     if (error) {
                        resolve(error);
                        return;
                     }

                     resolve(result);
                  });
               })
            },
            shutdown: (): Promise<void> => {
               return pool.end();
            },
         };

         resolve(database);
      });
   })
}