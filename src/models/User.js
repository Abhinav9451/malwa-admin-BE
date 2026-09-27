const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const idPlugin = require('../utils/idPlugin');

// Admin-panel staff account. Mirrors malwa-admin's `User` type: name, email,
// phone, password, designation — no role field, every signed-in user has
// full access (matches the frontend's current behaviour exactly).
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    password: { type: String, required: true, select: false },
    designation: { type: String, default: '' },

    // Plaintext copy kept ONLY for seeded demo accounts, so the login
    // page's "tap to fill" list can show a working password like the
    // original localStorage demo did. Never set this for a real account
    // created after setup — see routes/authRoutes.js's demo-users endpoint.
    demoPassword: { type: String, select: false, default: null },
  },
  { timestamps: true }
);

userSchema.plugin(idPlugin, { hide: ['password', 'demoPassword'] });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
