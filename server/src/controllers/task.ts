import { Request, Response } from 'express';

import { Task } from '../models/task.js';
import { ReqAddTaskBody } from '../types/request.js';

export const getTaskList = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  try {
    const taskList = await Task.find({ userId: id });
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: 'Todos uploading fails!' });
  }
};

export const addTask = async (req: ReqAddTaskBody, res: Response) => {
  const { title, createdDate, expiredDate } = req.body;
  const { id } = req.body.user;
  try {
    const task = await Task.create({ userId: id, title, createdDate, expiredDate });
    const { userId, ...taskWithoutUserId } = task.toObject();
    res.status(201).json(taskWithoutUserId);
  } catch (error) {
    res.status(500).json({ message: 'Task creation fails!' });
  }
};
