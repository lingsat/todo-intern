import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string }): string =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
