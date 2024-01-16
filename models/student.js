// Import mongoose
import mongoose from 'mongoose';

// Define Student schema
const studentSchema = new mongoose.Schema({
    name: String,
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    },
    previousMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    },
});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

// Export Student model
export default Student;