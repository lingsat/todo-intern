import express from 'express';

import { auth } from '../middleware/auth.js';
import { getTaskList } from '../controllers/task.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, getTaskList);

export default taskRouter;
