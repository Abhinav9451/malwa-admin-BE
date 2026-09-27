const mongoose = require('mongoose');
const idPlugin = require('../utils/idPlugin');

const mediaSchema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    kind: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true }, // data URL for uploads, or any public link
    section: { type: String, required: true },
    caption: { type: String },
    published: { type: Boolean, default: false },
    uploadedAt: { type: String, required: true },
  },
  { timestamps: true }
);

mediaSchema.plugin(idPlugin);

module.exports = mongoose.model('Media', mediaSchema);
