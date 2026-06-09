const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  password: { type: String, required: false },
  coins: { type: Number, default: 50 },
  unlockedLevels: {
    type: Map,
    of: Number,
    default: { ramayana: 1, mahabharata: 1, ayurveda: 1, temples: 1 }
  },
  inventory: {
    type: [{ id: String, purchasedFor: String }],
    default: []
  },
  completedLevels: {
    type: [String],
    default: []
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
