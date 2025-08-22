import Report from '../models/Report.js';

// Submit a new report (unauthenticated)
export const submitReport = async (req, res) => {
  try {
    const { name, email, phone, abuseType, description } = req.body;
    if (!name || !email || !phone || !abuseType || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const report = await Report.create({ name, email, phone, abuseType, description });
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reports (director-only)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a report by ID (director-only)
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // ✅ Fix: use deleteOne instead of remove
    await report.deleteOne();

    // Or alternative: await Report.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
