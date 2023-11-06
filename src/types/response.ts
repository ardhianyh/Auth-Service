
export interface IUserResponse {
   id: string;
   name: string;
   email: string;
   source: string;
   created_at: string;
}

export interface IUserPasswordResponse extends IUserResponse {
   password: string;
}