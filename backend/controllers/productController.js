const Product = require('../models/Product');

// GET /products
exports.getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const skip = parseInt(req.query.skip, 10) || 0;

    const [products, total] = await Promise.all([
      Product.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(),
    ]);

    const mapped = products.map(p => p.toClient());

    return res.json({
      products: mapped,
      total,
      skip,
      limit,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product.toClient());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /products/search
exports.searchProducts = async (req, res) => {
  try {
    const { q = '' } = req.query;
    const limit = parseInt(req.query.limit, 10) || 30;
    const skip = parseInt(req.query.skip, 10) || 0;

    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query),
    ]);

    const mapped = products.map(p => p.toClient());

    return res.json({
      products: mapped,
      total,
      skip,
      limit,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /products/category/:category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit, 10) || 30;
    const skip = parseInt(req.query.skip, 10) || 0;

    const query = { category };

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query),
    ]);

    const mapped = products.map(p => p.toClient());

    return res.json({
      products: mapped,
      total,
      skip,
      limit,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

