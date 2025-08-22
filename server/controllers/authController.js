import Director from '../models/Director.js';
import jwt from 'jsonwebtoken';

// Director login
export const loginDirector = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  const director = await Director.findOne({ username });
  if (!director) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await director.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: director._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

// Change password for logged-in director
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide old and new password' });
  }

  const director = await Director.findById(req.director._id);
  if (!director) {
    return res.status(404).json({ message: 'Director not found' });
  }

  const isMatch = await director.matchPassword(oldPassword);
  if (!isMatch) {
    return res.status(401).json({ message: 'Old password is incorrect' });
  }

  director.password = newPassword;
  await director.save();

  res.json({ message: 'Password changed successfully' });
};
