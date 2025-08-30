import express from 'express';
import { submitReport, getReports, deleteReport } from '../controllers/reportController.js';
import { protectDirector } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ----------------------
// Public Route
// ----------------------
// Single optional image, field name: 'image'
router.post('/', upload.single('image'), submitReport);

// ----------------------
// Director-only Routes
// ----------------------
router.get('/', protectDirector, getReports);
router.delete('/:id', protectDirector, deleteReport);

export default router;
