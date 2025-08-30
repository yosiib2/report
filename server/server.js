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
const allowedOrigins = [
  'http://localhost:8080',                 // local frontend
  'http://localhost:8081',                 // alternative local frontend
  process.env.CLIENT_URL,                  // optional from .env
  'https://report-frontend-ebon.vercel.app',
  'https://report-then.vercel.app',
  'https://report-5jho.vercel.app'         // ✅ your current frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked request from origin: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);

// ==========================
// Body parser
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Server start failed:', err);
  }
};

startServer();
