const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// POST /api/login
router.post('/login', loginUser);

// // Logout route
// router.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//       if (err) {
//           return res.status(500).json({ message: "Logout failed" });
//       }
//       res.clearCookie('connect.sid');
//       res.json({ message: "Logged out successfully" });
//   });
// });

module.exports = router;
