import { Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import { generateTokens } from '../utils/tokenGenerator.js';
import { ReqUserBody } from '../types/request.js';
import { ITokenUser, IUser } from '../types/user.js';
import { SALT_ROUNDS } from '../constants.js';
import CustomError from '../utils/errorCreator.js';

export const registerUser = async (req: ReqUserBody) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError(409, `User with email '${email}' already exists. Try to Log in.`);
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ email, password: hashedPassword });

  const tokens = generateTokens({ id: user.id, email });
  const userRes: IUser = {
    id: user.id,
    email,
    ...tokens,
  };
  return { status: 200, data: userRes };
};

export const loginUser = async (req: ReqUserBody) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const isPassCorrect = await bcrypt.compare(String(password), String(user.password));
    if (isPassCorrect) {
      const tokens = generateTokens({ id: user.id, email });
      const userRes: IUser = {
        id: user.id,
        email,
        ...tokens,
      };
      return { status: 200, data: userRes };
    } else {
      throw new CustomError(401, 'Wrong Password!');
    }
  } else {
    throw new CustomError(404, 'User not Found!');
  }
};

export const getNewTokens = async (req: Request) => {
  const { refreshToken } = req.body;

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
  const { id, email } = decoded as ITokenUser;
  const tokens = generateTokens({ id, email });
  return { status: 200, data: tokens };
};
