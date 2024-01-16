// Import dependencies
import express from 'express';
import { createStudent, getAllStudents, assignStudentToMentor, addStudentsToMentor, assignOrChangeMentorForStudent, getStudentsForMentor, getPreviousMentorForStudent, getStudentsWithoutMentors } from '../controllers/studentController.js';

// Create a router
const router = express.Router();

// Define student routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.put('/assign', assignStudentToMentor);
router.put('/add-to-mentor', addStudentsToMentor);
router.put('/assign-or-change-mentor', assignOrChangeMentorForStudent);
router.get('/mentor/:mentorId', getStudentsForMentor);
router.get('/previous-mentor/:studentId', getPreviousMentorForStudent);
router.get('/without-mentor', getStudentsWithoutMentors);

// Export the router
export default router;