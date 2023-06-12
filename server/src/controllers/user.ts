import { Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models/user.js';
import { generateToken } from '../utils/tokenGenerator.js';
import { ReqUserBody } from '../types/request.js';
import { IUser } from '../types/user.js';

export const registerUser = async (req: ReqUserBody, res: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    if (user) {
      const token = generateToken({ id: user.id, email });
      const userRes: IUser = {
        id: user.id,
        email,
        token,
      };
      res.status(200).json(userRes);
    }
  } catch (error) {
    res.status(403).json({ message: 'User already exists!' });
  }
};

export const loginUser = async (req: ReqUserBody, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPassCorrect = await bcrypt.compare(String(password), String(user.password));
      if (isPassCorrect) {
        const token = generateToken({ id: user.id, email });
        const userRes: IUser = {
          id: user.id,
          email,
          token,
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
