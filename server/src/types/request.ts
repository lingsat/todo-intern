import { Request } from 'express';

export interface ReqUserBody extends Request {
  body: {
    email: string;
    password: string;
  };
}
