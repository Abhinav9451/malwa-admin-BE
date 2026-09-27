const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const paymentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    receiptNo: { type: String, required: true },
    projectId: { type: String, required: true },
    milestoneId: { type: String },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    mode: { type: String, enum: ['cash', 'upi', 'bank', 'cheque', 'rtgs'], required: true },
    ref: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

paymentSchema.plugin(idPlugin);

module.exports = mongoose.model('Payment', paymentSchema);
