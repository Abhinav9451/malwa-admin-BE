const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const commitmentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    refNo: { type: String, required: true },
    vendorId: { type: String, required: true },
    projectId: { type: String, required: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    date: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['ordered', 'delivered', 'cancelled'], default: 'ordered' },
    note: { type: String },
  },
  { timestamps: true }
);

commitmentSchema.plugin(idPlugin);

module.exports = mongoose.model('Commitment', commitmentSchema);
