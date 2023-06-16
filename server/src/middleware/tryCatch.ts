import { Request, Response, NextFunction } from 'express';

import { ICustomError } from '../types/error.js';

export const tryCatch =
  <T extends Function>(controller: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res, next);
      res.status(response.status).json(response.data);
    } catch (err) {
      const error = err as ICustomError;
      const status = error.status || 500;
      const message = error.message || 'Internal Server Error';
      res.status(status).json({ message });
    }
  };
