// controllers/userController.js
exports.getUserProfile = (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.userId;

    const User = require('../models/User');
    User.findById(userId)
        .select('-password') // don't send password
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        });
};
