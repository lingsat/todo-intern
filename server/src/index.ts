import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// Create Server
const app = express();

// Connect to MongoDb
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_DB_URL}`);

// Routes
app.get('/', (_, res) => {
  res.json({ message: 'Server works!' });
});

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
