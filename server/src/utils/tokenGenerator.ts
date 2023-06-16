import jwt from 'jsonwebtoken';

import { ITokenUser } from '../types/user.js';

export const generateTokens = (payload: ITokenUser) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_EXP,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXP,
  });

  return { token, refreshToken };
};
