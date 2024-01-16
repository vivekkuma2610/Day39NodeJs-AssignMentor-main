// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
const dbUri = process.env.MONGO_URI;

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
})

db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
})

// Middleware
app.use(express.json());

// Routes
import mentorRoutes from './routes/mentorRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});