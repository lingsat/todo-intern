import { Error as MongooseError } from 'mongoose';

export interface CustomEmailError extends MongooseError {
  code?: number;
  keyPattern?: { [key: string]: number };
}
