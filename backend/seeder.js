const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products'); // Verify path
const connectDB = require('./config/db');

// Debug the import
console.log('Products type:', typeof products);
console.log('Products content:', products);

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin'
    });

    // Verify products is array before mapping
    if (!Array.isArray(products)) {
      throw new Error('Products data is not an array');
    }

    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUser._id
    }));

    await Product.insertMany(productsWithUser);
    console.log(`Successfully seeded ${products.length} products!`);
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();