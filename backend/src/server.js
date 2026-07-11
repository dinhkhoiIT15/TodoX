import express from 'express';
import taskRoute from './routes/tasksRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json()); //middleware để parse dữ liệu JSON từ request body
app.use(cors({origin: 'http://localhost:5173'}));

app.use('/api/tasks', taskRoute);

connectDB().then(() => {
      app.listen(PORT, () => {
      console.log('Server bắt đầu trên cổng 5001');
});
});

