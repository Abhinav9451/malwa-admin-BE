const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const reminderSchema = new mongoose.Schema(
  {
    _id: { type: String },
    kind: { type: String, enum: ['payment', 'vendor', 'site', 'custom'], required: true },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    toName: { type: String, required: true },
    toPhone: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ['pending', 'done'], default: 'pending' },
    projectId: { type: String },
  },
  { timestamps: true }
);

reminderSchema.plugin(idPlugin);

module.exports = mongoose.model('Reminder', reminderSchema);
