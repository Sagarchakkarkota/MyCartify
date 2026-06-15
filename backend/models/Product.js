const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

productSchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    title: this.name,
    description: this.description,
    price: this.price,
    category: this.category,
    images: this.images,
    stock: this.stock,
    thumbnail: this.images?.[0] || '',
  };
};

module.exports = mongoose.model('Product', productSchema);

