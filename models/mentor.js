// Import mongoose
import mongoose from 'mongoose';

// Define Mentor schema
const mentorSchema = new mongoose.Schema({
    name: String,
    // Add other mentor-related fields here
});

// Create Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

// Export Mentor model
export default Mentor;