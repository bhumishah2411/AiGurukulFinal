const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'gurukul_secret_key_123';

// ── Auth Middleware ───────────────────────────────────────────────
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Authentication required' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user) return res.status(401).json({ error: 'User does not exist' });
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Session expired' });
  }
};

// ── Sync Game Data ────────────────────────────────────────────────
router.post('/sync', auth, async (req, res) => {
  try {
    const { coins, unlockedLevels, inventory, completedLevels } = req.body;
    
    const user = req.user;
    if (coins !== undefined) user.coins = coins;
    if (unlockedLevels !== undefined) user.unlockedLevels = unlockedLevels;
    if (inventory !== undefined) user.inventory = inventory;
    if (completedLevels !== undefined) user.completedLevels = completedLevels;
    
    await user.save();
    res.json({ success: true, message: 'Progress synced' });

  } catch (err) {
    console.error('[SyncError]', err.message);
    res.status(500).json({ error: 'Failed to sync game progress' });
  }
});

module.exports = router;
