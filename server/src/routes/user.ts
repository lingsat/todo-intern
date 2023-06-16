import express from 'express';

import { registerUser, loginUser, getNewTokens } from '../controllers/user.js';
import { tryCatch } from '../middleware/tryCatch.js';

const userRouter = express.Router();

userRouter.post('/register', tryCatch(registerUser));
userRouter.post('/login', tryCatch(loginUser));
userRouter.post('/refresh', tryCatch(getNewTokens));

export default userRouter;
