export enum ISource {
  WEB = 'web',
  GOOGLE = 'google'
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  source: ISource
}

export interface IEditableUser {
  name: string;
  email: string;
}

export interface IUserToken {
  user_id: string;
  token: string;
  expired_at: string;
}

export interface IUserSession {
  id: string;
  user_id: string;
  created_at: string;
}