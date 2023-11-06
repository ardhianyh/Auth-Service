import { IDatabase, IEditableUser, ISession, IUser, IUserPasswordResponse, IUserResponse, IUserSession, IUserToken } from "../types";

export class UserRepository {
   constructor(private database: IDatabase) { }

   async getUsers(): Promise<IUserResponse[] | Error | undefined> {
      const query = await this.database.query<IUserResponse>("SELECT * FROM public.user", []);
      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(user => user as IUserResponse);
   }

   async getUserById(userId: string): Promise<IUserResponse | Error> {
      const query = await this.database.query<IUserResponse>("SELECT * FROM public.user WHERE id = $1", [userId]);
      if (query instanceof Error) {
         return query;
      }

      const result = query.rows[0];
      return {
         id: result.id,
         name: result.name,
         email: result.email,
         source: result.source,
         created_at: result.created_at
      };
   }

   async getUserByEmail(email: string): Promise<{ id: string, password: string } | Error> {
      const query = await this.database.query<IUserPasswordResponse>("SELECT * FROM public.user WHERE email = $1", [email]);
      if (query instanceof Error) {
         return query;
      }

      const result = query.rows[0];
      return {
         id: result.id,
         password: result.password
      }
   }

   async insertUser(user: IUser): Promise<IUserResponse | Error> {
      const query = await this.database.query<IUserResponse>(`
         INSERT INTO public.user 
         (name, email, password, source) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *
      `, [
         user.name,
         user.email,
         user.password,
         user.source
      ]);

      if (query instanceof Error) {
         return query;
      }

      const result = query.rows[0];
      return {
         id: result.id,
         name: result.name,
         email: result.email,
         source: result.source,
         created_at: result.created_at
      };
   }

   async updateUser(userId: string, user: IEditableUser): Promise<IUserResponse | Error> {
      const query = await this.database.query<IUserResponse>(`
         UPDATE public.user
         SET 
            name = $1,
            email = $2
         WHERE id = $3
         RETURNING *
      `, [
         user.name,
         user.email,
         userId
      ]);

      if (query instanceof Error) {
         return query;
      }

      const result = query.rows[0];
      return {
         id: result.id,
         name: result.name,
         email: result.email,
         source: result.source,
         created_at: result.created_at
      };
   }

   async deleteUser(userId: string): Promise<object | Error> {
      const query = await this.database.query<object>(`
         DELETE FROM public.user
         WHERE id = $1;
      `, [userId]);

      if (query instanceof Error) {
         return query;
      }

      return { id: userId, message: "Delete Succeed!" };
   }

   async insertUserToken(data: IUserToken): Promise<string | Error> {
      const query = await this.database.query<IUserToken>(`
         INSERT INTO public.user_token 
         (user_id, token, expired_at) 
         VALUES ($1, $2, $3) 
         RETURNING user_id, token, expired_at
      `, [
         data.user_id,
         data.token,
         data.expired_at
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0].token;
   }

   async getUserToken(token: string): Promise<IUserToken | Error | undefined> {
      const query = await this.database.query<IUserToken>(`
         SELECT user_id, token, expired_at FROM public.user_token
         WHERE token = $1
      `, [token]);

      if (query instanceof Error) {
         return query;
      }

      if (query.rows.length === 0) {
         return undefined;
      }

      return query.rows[0];
   }

   async removeUserToken(token: string): Promise<object | Error> {
      const query = await this.database.query<IUserToken>(`
         DELETE FROM public.user_token
         WHERE token = $1;
      `, [token]);

      if (query instanceof Error) {
         return query;
      }

      return { message: "Delete Succeed!" };
   }

   async getVerifiedUser(userId: string): Promise<boolean | Error> {
      const query = await this.database.query<{}>(`
         SELECT * FROM public.user_verified 
         WHERE user_id = $1
      `, [
         userId
      ]);

      if (query instanceof Error) {
         return query;
      }

      if (query.rows.length === 0) return false;
      return true;
   }

   async verifiedUser(userId: string): Promise<boolean | Error> {
      const query = await this.database.query<{}>(`
         INSERT INTO public.user_verified 
         (user_id) 
         VALUES ($1)
      `, [
         userId
      ]);

      if (query instanceof Error) {
         return query;
      }

      return true;
   }

   async getUserSession(sessionId: string): Promise<ISession | Error> {
      const query = await this.database.query<ISession>(`
         SELECT * FROM public.user_session 
         WHERE id = $1
      `, [
         sessionId
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

   async insertUserSession(userId: string, expired_at: string): Promise<IUserSession | Error> {
      const query = await this.database.query<IUserSession>(`
         INSERT INTO public.user_session 
         (user_id, expired_at) 
         VALUES ($1, $2)
         RETURNING *
      `, [
         userId,
         expired_at
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

   async deleteUserSession(sessionId: string): Promise<{} | Error> {
      const query = await this.database.query<IUserSession>(`
         DELETE FROM public.user_session 
         WHERE id = $1
      `, [
         sessionId
      ]);

      if (query instanceof Error) {
         return query;
      }

      return { message: "Delete Succeed!" };
   }

}