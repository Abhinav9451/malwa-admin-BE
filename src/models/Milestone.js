const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const milestoneSchema = new mongoose.Schema(
  {
    _id: { type: String },
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    paidAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'partial', 'paid'], default: 'pending' },
  },
  { timestamps: true }
);

milestoneSchema.plugin(idPlugin);

module.exports = mongoose.model('Milestone', milestoneSchema);
