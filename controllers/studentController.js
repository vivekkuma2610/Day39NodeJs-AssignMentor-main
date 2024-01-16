// Import Student model
import Student from '../models/student.js';
import Mentor from '../models/mentor.js';

// Create a new student
export const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create student' });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch students' });
    }
};

// Assign a student to a mentor
export const assignStudentToMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;

        const student = await Student.findByIdAndUpdate(
            studentId,
            { mentor: mentorId },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not assign student to mentor' });
    }
};

// Select one mentor and add multiple students
export const addStudentsToMentor = async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;

        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }

        const students = await Student.updateMany(
            { _id: { $in: studentIds } },
            { mentor: mentorId }
        );

        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not add students to mentor' });
    }
};

// Assign or change mentor for a particular student
export const assignOrChangeMentorForStudent = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Store the current mentor as the previous mentor
        student.previousMentor = student.mentor;

        // Update the student's mentor with the new mentor ID
        student.mentor = mentorId;

        await student.save();

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not assign/change mentor for student' });
    }
};

// Show all students for a particular mentor
export const getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const students = await Student.find({ mentor: mentorId });

        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch students for mentor' });
    }
};

// Show the previously assigned mentor for a particular student
export const getPreviousMentorForStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const previousMentorId = student.previousMentor;

        res.json({ previousMentorId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch previous mentor for student' });
    }
};

// Get all students without mentors
export const getStudentsWithoutMentors = async (req, res) => {
    try {
      const students = await Student.find({ mentor: null });
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch students without mentors' });
    }
  };