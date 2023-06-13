import express from 'express';

import { auth } from '../middleware/auth.js';
import { addTask, getTaskList, editTask } from '../controllers/task.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, getTaskList);
taskRouter.post('/', auth, addTask);
taskRouter.patch('/edit', auth, editTask);

export default taskRouter;
