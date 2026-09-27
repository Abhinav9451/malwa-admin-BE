const ApiError = require('../utils/ApiError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'That value is already in use' });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = errorHandler;
