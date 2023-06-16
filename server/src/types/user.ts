export interface IUser {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface ITokenUser {
  id: string;
  email: string;
}
