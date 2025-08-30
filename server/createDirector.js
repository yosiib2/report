import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Director from './models/Director.js';

dotenv.config();

const createDirector = async () => {
  await connectDB();

  const username = 'Motri';
  const password = 'yosii123';

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
