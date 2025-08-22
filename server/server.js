import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: true, // allows requests from any frontend origin dynamically
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
