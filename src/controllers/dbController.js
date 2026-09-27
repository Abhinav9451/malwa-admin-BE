const asyncHandler = require('../utils/asyncHandler');
const Customer = require('../models/Customer');
const Project = require('../models/Project');
const Milestone = require('../models/Milestone');
const Payment = require('../models/Payment');
const Material = require('../models/Material');
const Vendor = require('../models/Vendor');
const Commitment = require('../models/Commitment');
const VendorPayment = require('../models/VendorPayment');
const Reminder = require('../models/Reminder');
const Media = require('../models/Media');
const Settings = require('../models/Settings');
const User = require('../models/User');

// Every collection the frontend's `DB` object holds, except `users`
// (read-only from the frontend's side — see README "Why /api/db syncs
// everything but users").
const SYNCABLE_COLLECTIONS = {
  customers: Customer,
  projects: Project,
  milestones: Milestone,
  payments: Payment,
  materials: Material,
  vendors: Vendor,
  commitments: Commitment,
  vendorPayments: VendorPayment,
  reminders: Reminder,
  media: Media,
};

// GET /api/db — the whole admin-panel dataset in one call, shaped exactly
// like the frontend's local `DB` object used to be (before it lived in
// MongoDB instead of localStorage).
const getDb = asyncHandler(async (req, res) => {
  const [
    users,
    customers,
    projects,
    milestones,
    payments,
    materials,
    vendors,
    commitments,
    vendorPayments,
    reminders,
    media,
    settings,
  ] = await Promise.all([
    User.find(),
    Customer.find(),
    Project.find(),
    Milestone.find(),
    Payment.find(),
    Material.find(),
    Vendor.find(),
    Commitment.find(),
    VendorPayment.find(),
    Reminder.find(),
    Media.find(),
    Settings.getSettings(),
  ]);

  res.json({
    users,
    customers,
    projects,
    milestones,
    payments,
    materials,
    vendors,
    commitments,
    vendorPayments,
    reminders,
    media,
    settings,
  });
});

// PUT /api/db — accepts any subset of the syncable collections (arrays,
// keyed exactly like the DB object) plus an optional `settings` object.
// Each provided collection fully REPLACES what's in MongoDB (mirrors what
// the frontend used to do with `localStorage.setItem` on every change) —
// a key left out is simply left untouched. `users` is always ignored here:
// staff accounts are never written by the admin panel's own UI.
const syncDb = asyncHandler(async (req, res) => {
  const body = req.body || {};

  await Promise.all(
    Object.entries(SYNCABLE_COLLECTIONS).map(async ([key, Model]) => {
      if (!Array.isArray(body[key])) return;
      const docs = body[key].map(({ id, ...rest }) => ({ _id: id, ...rest }));
      await Model.deleteMany({});
      if (docs.length) await Model.insertMany(docs);
    })
  );

  if (body.settings && typeof body.settings === 'object') {
    const settings = await Settings.getSettings();
    Object.assign(settings, body.settings);
    await settings.save();
  }

  res.json({ ok: true });
});

module.exports = { getDb, syncDb };
