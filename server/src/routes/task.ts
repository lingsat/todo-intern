import express from 'express';

import { auth } from '../middleware/auth.js';
import { addTask, getTaskList, editTask, deleteTask, deleteCompleted } from '../controllers/task.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, getTaskList);
taskRouter.post('/', auth, addTask);
taskRouter.patch('/:id', auth, editTask);
taskRouter.delete('/:id', auth, deleteTask);
taskRouter.delete('/completed', auth, deleteCompleted);

export default taskRouter;
