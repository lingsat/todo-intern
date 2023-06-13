import { Request, Response } from 'express';

import { Task } from '../models/task.js';
import { ReqAddTaskBody, ReqEditTaskBody } from '../types/request.js';

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
  const { title, createdDate, expiredDate, user } = req.body;
  try {
    const task = await Task.create({ userId: user.id, title, createdDate, expiredDate });
    const { userId, ...taskWithoutUserId } = task.toObject();
    res.status(201).json(taskWithoutUserId);
  } catch (error) {
    res.status(500).json({ message: 'Task creation fails!' });
  }
};

export const editTask = async (req: ReqEditTaskBody, res: Response) => {
  const { _id, title, createdDate, expiredDate, completed, user } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: _id, userId: user.id },
      { title, createdDate, expiredDate, completed },
      { new: true },
    );
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not Found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Task update fails!' });
  }
};
