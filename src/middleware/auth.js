const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

// Verifies the JWT and attaches the logged-in user to req.user. Every
// signed-in user has full access (matches the frontend's current
// behaviour: there is no role field on User).
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authenticated');
  }

  const token = header.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, 'User no longer exists');

  req.user = user;
  next();
});

module.exports = { protect };
