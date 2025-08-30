import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware: CORS
app.use(
  cors({
    origin: [
      'http://localhost:8081',            // your frontend during dev
      process.env.CLIENT_URL,             // optional from .env
      'https://your-frontend.vercel.app' // deployed frontend
    ],
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());

// ==========================
// Serve uploaded images
// ==========================
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Running...'));

// Start server after DB connection
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
