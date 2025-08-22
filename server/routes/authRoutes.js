import express from 'express';
import { loginDirector, changePassword } from '../controllers/authController.js';
import { protectDirector } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route: login
router.post('/login', loginDirector);

// Protected route: change password
router.put('/change-password', protectDirector, changePassword);

export default router;
