// models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    abuseType: { type: String, required: true },
    description: { type: String, required: true },
    sex: { type: String, required: true },
    workPosition: { type: String, required: true },
    educationLevel: { type: String, required: true },
    jobType: { type: String, required: true },
    incidentTime: { type: String, required: true },
    incidentPlace: { type: String, required: true },
    incidentDay: { type: String, required: true },
    
    // **New optional image field**
    image: { type: String } // store the file path
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
