// routes/user.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');

// Middleware to check if logged in
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

router.get('/me', isAuthenticated, getUserProfile);

module.exports = router;
