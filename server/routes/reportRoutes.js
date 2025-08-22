import express from 'express';
import { submitReport, getReports, deleteReport } from '../controllers/reportController.js';
import { protectDirector } from '../middleware/authMiddleware.js';

const router = express.Router();

// ----------------------
// Public Route
// ----------------------
router.post('/', submitReport);  // Anyone can submit a report

// ----------------------
// Director-only Routes
// ----------------------
router.get('/', protectDirector, getReports);       // View all reports
router.delete('/:id', protectDirector, deleteReport); // Delete a specific report

export default router;
