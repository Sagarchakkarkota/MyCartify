const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true },
);

categorySchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    name: this.name,
    slug: this.slug,
    image: this.image || '',
  };
};

module.exports = mongoose.model('Category', categorySchema);

