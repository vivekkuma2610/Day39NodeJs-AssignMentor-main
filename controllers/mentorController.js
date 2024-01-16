// Import Mentor model
import Mentor from '../models/mentor.js';

// Create a new mentor
export const createMentor = async (req, res) => {
    try {
        const mentor = await Mentor.create(req.body);
        res.status(201).json(mentor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create mentor' });
    }
};

// Get all mentors
export const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch mentors' });
    }
};