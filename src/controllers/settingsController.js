const asyncHandler = require('../utils/asyncHandler');
const Settings = require('../models/Settings');

const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.getSettings();
  res.json({ settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.getSettings();
  Object.assign(settings, req.body);
  await settings.save();
  res.json({ settings });
});

module.exports = { getSettings, updateSettings };
