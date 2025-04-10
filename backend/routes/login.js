// backend/routes/login.js or inside authController
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // assuming you have a User model
const bcrypt = require('bcryptjs');

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login success
    return res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
