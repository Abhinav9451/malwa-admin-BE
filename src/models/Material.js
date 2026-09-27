const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const materialSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Aggregate', 'Cement', 'Steel', 'Bricks & Blocks', 'Tiles & Stone',
        'Electrical', 'Plumbing', 'Paint & Finish', 'Wood & Ply', 'Misc',
      ],
      required: true,
    },
    unit: {
      type: String,
      enum: ['trolley', 'bag', 'qtl', 'kg', 'cft', 'nos', 'per 1000', 'sqft', 'rft', 'litre'],
      required: true,
    },
    rate: { type: Number, required: true },
    delivery: { type: Number, default: 0 },
    vendorId: { type: String, required: true },
    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 0 },
    updatedAt: { type: String, required: true }, // frontend-managed ISO date, kept separate from timestamps
  },
  { timestamps: true }
);

materialSchema.plugin(idPlugin);

module.exports = mongoose.model('Material', materialSchema);
