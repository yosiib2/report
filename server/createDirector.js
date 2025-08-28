import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Director from './models/Director.js'; 

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create director
const createDirector = async () => {
  await connectDB();

const username = 'Motri';
const password = 'yosii123@';

  // Check if director already exists
  const existing = await Director.findOne({ username });
  if (existing) {
    console.log('Director already exists');
    process.exit(0);
  }

  // Create new director without manual hashing
  const director = new Director({
    username,
    password, // pre-save hook will hash it automatically
  });

  try {
    await director.save();
    console.log('Director created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error creating director:', err);
    process.exit(1);
  }
};

createDirector();
