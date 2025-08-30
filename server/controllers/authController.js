import Director from '../models/Director.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ====================
// Director Login
// ====================
export const loginDirector = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Find director by username
    const director = await Director.findOne({ username });
    if (!director) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, director.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: director._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      director: {
        id: director._id,
        username: director.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====================
// Change Director Password
// ====================
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide old and new passwords' });
    }

    // Load director from DB (middleware already verified token)
    const director = await Director.findById(req.director._id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, director.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update directly without triggering pre-save hook
    await Director.findByIdAndUpdate(director._id, { password: hashedPassword });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
