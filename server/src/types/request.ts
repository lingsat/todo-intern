import { Request } from 'express';

import { IUser } from './user.js';

export interface ReqUserBody extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface ReqAddTaskBody extends Request {
  body: {
    title: string;
    createdDate: string;
    expiredDate: string;
    user: IUser;
  };
}

export interface ReqEditTaskBody extends Request {
  body: {
    _id: string;
    title: string;
    createdDate: string;
    expiredDate: string;
    completed: boolean;
    user: IUser;
  };
}
