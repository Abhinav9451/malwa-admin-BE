const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const customerSchema = new mongoose.Schema(
  {
    _id: { type: String }, // uses the frontend's own id (e.g. "c1"), not an auto ObjectId
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    gstin: { type: String },
    since: { type: String, required: true }, // ISO date string, as the frontend sends it
    note: { type: String },
  },
  { timestamps: true }
);

customerSchema.plugin(idPlugin);

module.exports = mongoose.model('Customer', customerSchema);
