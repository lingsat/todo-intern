import express from 'express';

import { auth } from '../middleware/auth.js';
import { addTask, getTaskList, editTask, deleteTask, deleteCompleted } from '../controllers/task.js';
import { tryCatch } from '../middleware/tryCatch.js';

const taskRouter = express.Router();

taskRouter.get('/', auth, tryCatch(getTaskList));
taskRouter.post('/', auth, tryCatch(addTask));
taskRouter.delete('/completed', auth, tryCatch(deleteCompleted));
taskRouter.patch('/:id', auth, tryCatch(editTask));
taskRouter.delete('/:id', auth, tryCatch(deleteTask));

export default taskRouter;
