const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const routes = require('./routes');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB function
async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(uri);
        console.log('Connected to MongoDB');
        // Additional code to interact with MongoDB
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Initialize MongoDB connection and start the server
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Connected to DB and Web Server is running on port ${port}`);
    });
});
