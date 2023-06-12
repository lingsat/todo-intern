import express from 'express';

import { getTaskList } from '../controllers/task.js';
import { auth } from '../middleware/auth.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, getTaskList);

export default taskRouter;
