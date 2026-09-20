// Step 1 - Task 2: Import necessary packages
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');

// Step 1 - Task 3: Create a Pino logger instance
const logger = pino();

dotenv.config();

// Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        // Step 2 - Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Step 2 - Task 2: Access the users collection
        const collection = db.collection('users');

        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Step 2 - Task 3: Check whether the email already exists
        const existingUser = await collection.findOne({ email: email });

        if (existingUser) {
            logger.warn(`Registration attempt with existing email: ${email}`);

            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Step 2 - Task 4: Hash password and save user details
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        const result = await collection.insertOne(newUser);

        logger.info(`User registered successfully: ${email}`);

        // Step 2 - Task 5: Create JWT authentication token
        const token = jwt.sign(
            {
                userId: result.insertedId,
                email: email
            },
            JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            authtoken: token,
            email: email
        });

    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

module.exports = router;