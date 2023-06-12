import { Request, Response } from 'express';

import { Task } from '../models/task.js';

export const getTaskList = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  try {
    const taskList = await Task.find({ userId: id });
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: 'Todos uploading fails!' });
  }
};
