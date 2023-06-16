import { Request } from 'express';
import { PipelineStage } from 'mongoose';

import { Task } from '../models/task.js';
import { EFilter } from '../types/filter.js';
import { ReqAddTaskBody, ReqEditTaskBody } from '../types/request.js';
import CustomError from '../utils/errorCreator.js';

export const getTaskList = async (req: Request) => {
  const { id } = req.body.user;
  const { search, filter } = req.query;

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

  const userTasksExist = await Task.exists({ userId: id });
  const taskList = await Task.aggregate(pipeline);
  return { status: 200, data: { userTasksExist, taskList } };
};

export const addTask = async (req: ReqAddTaskBody) => {
  const { title, createdDate, expiredDate, user } = req.body;

  const task = await Task.create({ userId: user.id, title, createdDate, expiredDate });
  const { userId, ...taskWithoutUserId } = task.toObject();
  return { status: 201, data: taskWithoutUserId };
};

export const editTask = async (req: ReqEditTaskBody) => {
  const { id } = req.params;
  const { title, createdDate, expiredDate, completed, user } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: user.id },
    { title, createdDate, expiredDate, completed },
    { new: true },
  );
  if (updatedTask) {
    return { status: 200, data: updatedTask };
  } else {
    throw new CustomError(404, 'Task not Found!');
  }
};

export const deleteTask = async (req: Request) => {
  const { user } = req.body;
  const { id } = req.params;

  await Task.findByIdAndDelete(id);
  const userTasksExist = await Task.exists({ userId: user.id });
  return {
    status: 200,
    data: {
      userTasksExist,
      message: 'Task deleted successfully!',
    },
  };
};

export const deleteCompleted = async (req: Request) => {
  const { user } = req.body;

  await Task.deleteMany({ completed: true });
  const userTasksExist = await Task.exists({ userId: user.id });
  return {
    status: 200,
    data: {
      userTasksExist,
      message: 'All Completed tasks deleted successfully!',
    },
  };
};
