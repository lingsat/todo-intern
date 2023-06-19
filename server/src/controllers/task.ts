import { Request, Response } from 'express';

import { Task } from '../models/task.js';
import { ReqAddTaskBody, ReqEditTaskBody } from '../types/request.js';

export const getTaskList = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const { search } = req.query;

  try {
    const userAllTasks = await Task.count({ userId: id });
    const taskList = await Task.aggregate([
      {
        $match: { userId: id, title: { $regex: search, $options: 'i' } },
      },
    ]);
    res.status(200).json({ userTasksExist: !!userAllTasks, taskList });
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
  const { id } = req.params;
  const { title, createdDate, expiredDate, completed, user } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: user.id },
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

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Task deletion fails!' });
  }
};

export const deleteCompleted = async (_: Request, res: Response) => {
  try {
    await Task.deleteMany({ completed: true });
    res.status(200).json({ message: 'All Completed tasks deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion fails!' });
  }
};
