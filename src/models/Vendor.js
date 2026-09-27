const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const vendorSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    contactPerson: { type: String, default: '' },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    kind: { type: String, enum: ['supplier', 'contractor'], required: true },
    supplies: { type: String, default: '' },
    gstin: { type: String },
    paymentTerms: { type: String, default: '' },
  },
  { timestamps: true }
);

vendorSchema.plugin(idPlugin);

module.exports = mongoose.model('Vendor', vendorSchema);
