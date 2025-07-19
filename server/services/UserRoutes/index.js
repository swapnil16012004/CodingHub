const express = require("express");
const router = express.Router();
const User = require("../../models/UserModel");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = newUser.generateJWT();

    res.status(201).json({
      message: `Welcome to CodingHub, Dear ${newUser.username}!`,
      token,
      user: newUser.username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).json({ message: "Invalid Password." });
    const token = user.generateJWT();

    res.status(200).json({
      message: `Welcome back to CodingHub, ${user.username}!`,
      user,
      token,
    });
  } catch (err) {
    console.error("Login failed:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out..." });
});

module.exports = router;
