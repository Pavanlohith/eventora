const express = require('express');
const router = express.Router();
const {registerUser, loginUser,verifyotp} = require('../controllers/authController');
const userModel = require('../models/user');
// Register route
router.post('/register', registerUser);
// Login route
router.post('/login', loginUser);
// Verify OTP route
router.post('/verify-otp', verifyotp);
router.put('/make-admin/:id', async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.params.id, {
            role: "admin"
        });

        res.json({ message: "User promoted to admin" });
    } catch (error) {
        res.status(500).json({ message: "Error updating role" });
    }
});
module.exports = router;