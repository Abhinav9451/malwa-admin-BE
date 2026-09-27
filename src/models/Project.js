const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const projectSchema = new mongoose.Schema(
  {
    _id: { type: String },
    code: { type: String, required: true },
    name: { type: String, required: true },
    customerId: { type: String, required: true }, // Customer.id, as the frontend addresses it
    mode: {
      type: String,
      enum: ['site_visit', 'floor_plans', 'elevation', 'interior', 'exterior', 'turnkey'],
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'on_hold', 'completed'],
      default: 'upcoming',
    },
    site: { type: String, required: true },
    city: { type: String, required: true },
    builtUpArea: { type: Number, default: 0 },
    contractValue: { type: Number, default: 0 },
    startDate: { type: String, required: true },
    targetDate: { type: String, required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    note: { type: String },
  },
  { timestamps: true }
);

projectSchema.plugin(idPlugin);

module.exports = mongoose.model('Project', projectSchema);
