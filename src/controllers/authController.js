const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const userExists = await User.findOne({ userId });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ userId, password });
        res.status(201).json({ message: "User registered successfully", userId: user.userId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ userId });
        if (!user) return res.status(400).json({ message: "Invalid User ID or Password" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid User ID or Password" });

        const token = jwt.sign({ id: user._id, userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
