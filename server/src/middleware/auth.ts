import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(403).json({ message: 'Access denied!' });

    const decoded = jwt.verify(token, SECRET_KEY);
    req.body.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid request!' });
  }
};
