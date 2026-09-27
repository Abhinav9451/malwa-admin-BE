const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

// Singleton document (_id fixed to "global") — the firm profile shown on the
// Settings page: firmName, tagline, address, phone, email, website, gstin,
// reminderWindowDays.
const settingsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: 'global' },
    firmName: { type: String, default: 'Malwa Builders' },
    tagline: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
    gstin: { type: String, default: '' },
    reminderWindowDays: { type: Number, default: 7 },
  },
  { timestamps: true }
);

settingsSchema.plugin(idPlugin);

settingsSchema.statics.getSettings = async function () {
  let settings = await this.findById('global');
  if (!settings) settings = await this.create({ _id: 'global' });
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
