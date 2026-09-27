const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.trim().toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.json({ user: user.toJSON(), token: signToken(user) });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toJSON() });
});

// GET /api/auth/demo-users — dev convenience only: powers the login page's
// "tap to fill" list, exactly like the original localStorage demo did.
// Only ever returns the handful of seeded demo accounts (see
// utils/ensureDemoUsers.js) — never a real password hash.
const demoUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ demoPassword: { $ne: null } }).select('+demoPassword');
  res.json({
    users: users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      password: u.demoPassword,
      designation: u.designation,
    })),
  });
});

module.exports = { login, me, demoUsers };
