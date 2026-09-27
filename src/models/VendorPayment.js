const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const vendorPaymentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    receiptNo: { type: String, required: true },
    commitmentId: { type: String, required: true },
    vendorId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    mode: { type: String, enum: ['cash', 'upi', 'bank', 'cheque', 'rtgs'], required: true },
    ref: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

vendorPaymentSchema.plugin(idPlugin);

module.exports = mongoose.model('VendorPayment', vendorPaymentSchema);
