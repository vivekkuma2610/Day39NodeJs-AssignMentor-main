// Import dependencies
import express from 'express';
import { createMentor, getAllMentors } from '../controllers/mentorController.js';

// Create a router
const router = express.Router();

// Define mentor routes
router.post('/', createMentor);
router.get('/', getAllMentors);

// Export the router
export default router;