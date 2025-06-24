import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import { userCredits } from './controllers/userController.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);

// FIXED LINE 👇
app.get('/api/credits', userCredits);

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
