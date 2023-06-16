import express from 'express';

import { registerUser, loginUser, getNewTokens } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/refresh', getNewTokens);

export default userRouter;
