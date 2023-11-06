import { QueryResult, QueryResultRow } from "pg";

export interface IDatabase {
   query: <T extends QueryResultRow>(
      queryText: string,
      paramaters: Array<unknown>,
   ) => Promise<QueryResult<T> | Error>;

   shutdown: () => Promise<void>;
}