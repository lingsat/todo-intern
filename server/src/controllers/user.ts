import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import { generateTokens } from '../utils/tokenGenerator.js';
import { ReqUserBody } from '../types/request.js';
import { ITokenUser, IUser } from '../types/user.js';
import { CustomEmailError } from '../types/error.js';
import { EMAIL_EXIST_ERROR_CODE, SALT_ROUNDS } from '../constants.js';

export const registerUser = async (req: ReqUserBody, res: Response) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });

    const tokens = generateTokens({ id: user.id, email });
    const userRes: IUser = {
      id: user.id,
      email,
      ...tokens,
    };
    res.status(200).json(userRes);
  } catch (error: unknown) {
    if ((error as CustomEmailError).code === EMAIL_EXIST_ERROR_CODE) {
      return res.status(409).json({
        message: `User with email '${email}' already exists. Try to Log in.`,
      });
    }
    res.status(500).json({ message: 'Registration fails!' });
  }
};

export const loginUser = async (req: ReqUserBody, res: Response) => {
  const { email, password } = req.body;

  try {
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
        res.status(200).json(userRes);
      } else {
        res.status(401).json({ message: 'Wrong Password!' });
      }
    } else {
      res.status(404).json({ message: 'User not Found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login fails!' });
  }
};

export const getNewTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    const { id, email } = decoded as ITokenUser;
    const tokens = generateTokens({ id, email });
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: 'Getting new tokens fails!' });
  }
};
