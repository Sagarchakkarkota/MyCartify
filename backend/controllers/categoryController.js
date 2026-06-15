const Category = require('../models/Category');

// GET /products/categories (DummyJSON compatible)
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    const mapped = categories.map(c => c.slug);
    return res.json(mapped);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /categories (simple categories list)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    const mapped = categories.map(c => c.slug);
    return res.json(mapped);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

