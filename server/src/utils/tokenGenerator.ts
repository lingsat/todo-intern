import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
  email: string;
}

export const generateToken = (payload: Payload): string =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
