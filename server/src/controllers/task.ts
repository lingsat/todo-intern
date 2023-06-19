import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';

import { Task } from '../models/task.js';
import { EFilter } from '../types/filter.js';
import { ReqAddTaskBody, ReqEditTaskBody } from '../types/request.js';

export const getTaskList = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const { search, filter } = req.query;

  try {
    const userTasksExist = (await Task.count({ userId: id })) > 0;
    const isCompletedExist = await Task.exists({ userId: id, completed: true });

    const pipeline: PipelineStage[] = [
      {
        $match: { userId: id, title: { $regex: search, $options: 'i' } },
      },
    ];

    if (filter === EFilter.COMPLETED) {
      pipeline.push({ $match: { completed: true } });
    } else if (filter === EFilter.ACTIVE) {
      pipeline.push({ $match: { completed: false } });
    }

    const taskList = await Task.aggregate(pipeline);
    res.status(200).json({ userTasksExist, isCompletedExist, taskList });
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
      const isCompletedExist = await Task.exists({ userId: user.id, completed: true });
      res.status(200).json({ isCompletedExist, updatedTask });
    } else {
      res.status(404).json({ message: 'Task not Found!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Task update fails!' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    const userTasksExist = (await Task.count({ userId: user.id })) > 0;
    const isCompletedExist = await Task.exists({ userId: user.id, completed: true });
    res.status(200).json({
      userTasksExist,
      isCompletedExist,
      message: 'Task deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Task deletion fails!' });
  }
};

export const deleteCompleted = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    await Task.deleteMany({ completed: true });
    const userTasksExist = (await Task.count({ userId: user.id })) > 0;
    const isCompletedExist = await Task.exists({ userId: user.id, completed: true });
    res.status(200).json({
      userTasksExist,
      isCompletedExist,
      message: 'All Completed tasks deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Deletion fails!' });
  }
};
