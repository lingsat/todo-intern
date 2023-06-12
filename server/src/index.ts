import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';

// Create Server
const app = express();

// Connect to MongoDb
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_DB_URL}`);

// Cors / Body Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (_, res) => {
  res.json({ message: 'Server works!' });
});
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Start Server
const port = process.env.PORT || 4200;
const start = () => {
  try {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error(`Error on server startup: ${(error as Error).message}`);
  }
};
start();
