require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://picsum.photos/300/200?random=1',
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    image: 'https://picsum.photos/300/200?random=2',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://picsum.photos/300/200?random=3',
  },
  {
    name: 'Grocery',
    slug: 'grocery',
    image: 'https://picsum.photos/300/200?random=4',
  },
];

const products = [
  {
    name: 'Wireless Noise Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation and long battery life.',
    price: 149.99,
    category: 'electronics',
    images: [
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=12',
    ],
    stock: 25,
  },
  {
    name: '5G Smartphone 128GB',
    description:
      'Modern smartphone with OLED display, 128GB storage and triple camera setup.',
    price: 499,
    category: 'electronics',
    images: ['https://picsum.photos/400/400?random=13'],
    stock: 40,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Water resistant portable Bluetooth speaker with deep bass.',
    price: 59.99,
    category: 'electronics',
    images: ['https://picsum.photos/400/400?random=14'],
    stock: 60,
  },
  {
    name: 'Men Slim Fit Denim Jeans',
    description: 'Comfortable slim fit denim jeans with stretch fabric.',
    price: 39.99,
    category: 'clothing',
    images: ['https://picsum.photos/400/400?random=15'],
    stock: 80,
  },
  {
    name: 'Women Summer Floral Dress',
    description: 'Lightweight floral dress perfect for everyday summer wear.',
    price: 34.99,
    category: 'clothing',
    images: ['https://picsum.photos/400/400?random=16'],
    stock: 50,
  },
  {
    name: 'Running Shoes',
    description: 'Breathable running shoes with cushioned sole for daily runs.',
    price: 69.99,
    category: 'clothing',
    images: ['https://picsum.photos/400/400?random=17'],
    stock: 45,
  },
  {
    name: 'Vitamin C Serum',
    description: 'Brightening facial serum with vitamin C and hyaluronic acid.',
    price: 24.99,
    category: 'beauty',
    images: ['https://picsum.photos/400/400?random=18'],
    stock: 120,
  },
  {
    name: 'Hydrating Face Moisturizer',
    description: 'Daily face moisturizer with SPF protection.',
    price: 19.99,
    category: 'beauty',
    images: ['https://picsum.photos/400/400?random=19'],
    stock: 90,
  },
  {
    name: 'Organic Arabica Coffee Beans',
    description: 'Whole-bean medium roast Arabica coffee with rich aroma.',
    price: 14.99,
    category: 'grocery',
    images: ['https://picsum.photos/400/400?random=20'],
    stock: 70,
  },
  {
    name: 'Almond Cranberry Granola',
    description: 'Crunchy granola with roasted almonds and dried cranberries.',
    price: 8.99,
    category: 'grocery',
    images: ['https://picsum.photos/400/400?random=21'],
    stock: 100,
  },
  {
    name: 'Extra Virgin Olive Oil 1L',
    description: 'Cold pressed olive oil perfect for cooking and salads.',
    price: 12.99,
    category: 'grocery',
    images: ['https://picsum.photos/400/400?random=22'],
    stock: 65,
  },
  {
    name: 'Waterproof Fitness Tracker',
    description: 'Fitness tracker with heart rate monitor and sleep tracking.',
    price: 79.99,
    category: 'electronics',
    images: ['https://picsum.photos/400/400?random=23'],
    stock: 55,
  },
];

const seed = async () => {
  try {
    console.log('Seeding started...');

    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories inserted:', createdCategories.length);

    const categorySlugs = createdCategories.map(c => c.slug);
    const safeProducts = products.filter(p =>
      categorySlugs.includes(p.category),
    );

    await Product.insertMany(safeProducts);
    console.log('Products inserted:', safeProducts.length);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seed();
