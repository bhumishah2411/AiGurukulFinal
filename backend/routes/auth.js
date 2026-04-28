const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'gurukul_secret_key_123';

// ── Signup ────────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already taken' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = new User({
      username,
      password: hashed
    });

    await newUser.save();
    
    // Create token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    
    res.status(201).json({ 
      success: true, 
      token, 
      user: { 
        username: newUser.username,
        coins: newUser.coins,
        unlockedLevels: newUser.unlockedLevels,
        inventory: newUser.inventory,
        completedLevels: newUser.completedLevels
      } 
    });

  } catch (err) {
    console.error('[SignupError]', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// ── Login ─────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    
    res.json({ 
      success: true, 
      token, 
      user: {
        username: user.username,
        coins: user.coins,
        unlockedLevels: user.unlockedLevels,
        inventory: user.inventory,
        completedLevels: user.completedLevels
      } 
    });

  } catch (err) {
    console.error('[LoginError]', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
