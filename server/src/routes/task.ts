import express from 'express';

import { auth } from '../middleware/auth.js';
import { addTask, getTaskList } from '../controllers/task.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, getTaskList);
taskRouter.post('/', auth, addTask);

export default taskRouter;
