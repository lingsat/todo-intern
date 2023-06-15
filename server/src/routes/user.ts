import express from 'express';

import { loginUser, getNewTokens } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/refresh', getNewTokens);

export default userRouter;
