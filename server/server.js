import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ==========================
// Middleware: CORS
// ==========================
app.use(
  cors({
    origin: [
      'http://localhost:8080',             // your frontend during dev
      'http://localhost:8081',             // alternative local dev port
      process.env.CLIENT_URL,              // from .env (optional)
      'https://report-then.vercel.app'     // your deployed frontend
    ],
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());

// ==========================
// Serve uploaded images
// ==========================
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ==========================
// Routes
// ==========================
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Running...'));

// ==========================
// Start server after DB connection
// ==========================
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
