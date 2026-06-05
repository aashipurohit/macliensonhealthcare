// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Product = require('./models/Product');
// const User = require('./models/User');
// const Cart = require('./models/Cart');
// const products = require('./data/products'); // Verify path
// const connectDB = require('./config/db');

// // Debug the import
// console.log('Products type:', typeof products);
// console.log('Products content:', products);

// dotenv.config();
// connectDB();
// mongoose.connect(process.env.MONGO_URI);

// //function to seed data

// const seedData = async () => {
//   try {
//       //clear existing daat
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();

//     const adminUser = await User.create({
//       name: 'Shivam',
//       email: 'shivam1@example.com',
//       password: '123456',
//       role: 'admin'
//     });

//     // Verify products is array before mapping
//     if (!Array.isArray(products)) {
//       throw new Error('Products data is not an array');
//     }

    

//     //Asign the default user ID to each product
//     const userID = adminUser._id;

//     const sampleProducts = products.map((product) => {
//       return{...product,user: userID};
//     });

//     await Product.insertMany(productsWithUser);
//     console.log(`Successfully seeded ${products.length} products!`);
//     process.exit();
//   } catch (error) {
//     console.error('Seeding error:', error);
//     process.exit(1);
//   }
// };

// seedData();

// const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// const Product = require('./models/Product');
// const User = require('./models/User');
// const Collection = require('./models/Collection'); // NEW
// const Cart = require('./models/Cart');
// const products = require('./data/products');
// const connectDB = require('./config/db');



// dotenv.config();
// connectDB();

// const seedData = async () => {
//   try {
//     // Clear existing data
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();
//     await Collection.deleteMany(); // NEW

//     // Create admin user
//     const adminUser = await User.create({
//       name: 'Shivam',
//       email: 'shivam1@example.com',
//       password: '123456',
//       role: 'admin'
//     });

//     // NEW: Seed collections first
//     const collectionsToSeed = [
//       { name: "Prenatal", slug: "prenatal" },
//       { name: "Diabetic Care", slug: "diabetic-care" },
//       { name: "Ayurvedic Care", slug: "ayurvedic-care" },
//       { name: "Pain Relief", slug: "pain-relief" },
//       { name: "Sports Nutrition", slug: "sports-nutrition" },
//       { name: "Kids Nutritions", slug: "kids-nutrition" },
//       { name: "Herbal Supplements", slug: "herbal-supplements" },
//       { name: "Nutritional Supplements", slug: "nutritional-supplements" }
//     ];
//     const seededCollections = await Collection.insertMany(collectionsToSeed);
//     console.log(`Seeded ${seededCollections.length} collections`);

//     // Create collection name to ID map
//     const collectionMap = {};
//     seededCollections.forEach(col => {
//       collectionMap[col.name] = col._id;
//     });

//     // Prepare products with ObjectId references
//     const sampleProducts = products.map(product => ({
//       ...product,
//       user: adminUser._id,
//       collections: [collectionMap[product.collections]], // Convert string to ObjectId
//       images: product.images.map(img => ({
//         url: img.url,
//         altText: img.altText || product.name
//       }))
//     }));

//     await Product.insertMany(sampleProducts);
//     console.log(`Successfully seeded ${sampleProducts.length} products!`);
//     process.exit();
//   } catch (error) {
//     console.error('Seeding error:', error);
//     process.exit(1);
//   }
// };

// seedData();

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const Collection = require("./models/Collection");
// const Cart = require("./models/Cart");
// const products = require("./data/products");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const seedData = async () => {
//   try {
//     // Clear existing data
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();
//     await Collection.deleteMany();

//     // Create admin user
//     const adminUser = await User.create({
//       name: "Shivam",
//       email: "shivam1@example.com",
//       password: "123456",
//       role: "admin",
//     });

//     // Seed collections
//     const collectionsToSeed = [
//       { name: "Prenatal", slug: "prenatal" },
//       { name: "Diabetic Care", slug: "diabetic-care" },
//       { name: "Ayurvedic Care", slug: "ayurvedic-care" },
//       { name: "Pain Relief", slug: "pain-relief" },
//       { name: "Sports Nutrition", slug: "sports-nutrition" },
//       { name: "Kids Nutritions", slug: "kids-nutrition" },
//       { name: "Herbal Supplements", slug: "herbal-supplements" },
//       { name: "Nutritional Supplements", slug: "nutritional-supplements" },
//     ];
//     const seededCollections = await Collection.insertMany(collectionsToSeed);

//     // Map collection names to ObjectIds
//     const collectionMap = {};
//     seededCollections.forEach((col) => {
//       collectionMap[col.name] = col._id;
//     });

//     const sampleProducts = products.map(product => ({
//   ...product,
//   user: adminUser._id, // assign admin user
//   collections: Array.isArray(product.collections)
//     ? product.collections.map(name => collectionMap[name])
//     : [collectionMap[product.collections]], // wrap string in array
//   images: product.images.map(img => ({
//     url: img.url,
//     altText: img.altText || product.name
//   }))
// }));


//     // Prepare products with correct ObjectId references
//     const productsWithIds = products.map((product) => ({
//       ...product,
//       user: adminUser._id,
//       collections: product.collections.map((name) => collectionMap[name]),
//     }));

//     await Product.insertMany(productsWithIds);
//     console.log(`Successfully seeded ${productsWithIds.length} products!`);
//     process.exit();
//   } catch (error) {
//     console.error("Seeding error:", error);
//     process.exit(1);
//   }
// };

// seedData();

// backend/seeder.js
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const Collection = require("./models/Collection");
// const Cart = require("./models/Cart");
// const products = require("./data/products");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const seedData = async () => {
//   try {
//     console.log("Clearing existing data...");
//     // Clear existing data
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();
//     await Collection.deleteMany();

//     // Create admin user
//     const adminUser = await User.create({
//       name: "Shivam",
//       email: "shivam1@example.com",
//       password: "123456",
//       role: "admin",
//     });

//     // Seed collections
//     const collectionsToSeed = [
//       { name: "Prenatal", slug: "prenatal" },
//       { name: "Diabetic Care", slug: "diabetic-care" },
//       { name: "Ayurvedic Care", slug: "ayurvedic-care" },
//       { name: "Pain Relief", slug: "pain-relief" },
//       { name: "Sports Nutrition", slug: "sports-nutrition" },
//       { name: "Kids Nutritions", slug: "kids-nutrition" },
//       { name: "Herbal Supplements", slug: "herbal-supplements" },
//       { name: "Nutritional Supplements", slug: "nutritional-supplements" },
//     ];

//     const seededCollections = await Collection.insertMany(collectionsToSeed);
//     console.log(`Seeded ${seededCollections.length} collections`);

//     // Map collection names to ObjectIds
//     const collectionMap = {};
//     seededCollections.forEach((col) => {
//       collectionMap[col.name] = col._id;
//     });

//     // Prepare products with correct ObjectId references
//     const productsWithIds = products.map((product) => ({
//       ...product,
//       user: adminUser._id, // assign admin user
//       collections: Array.isArray(product.collections)
//         ? product.collections.map((name) => collectionMap[name])
//         : [collectionMap[product.collections]], // wrap string in array
//       images: product.images.map((img) => ({
//         url: img.url,
//         altText: img.altText || product.name,
//       })),
//     }));

//     // Insert products
//     await Product.insertMany(productsWithIds);
//     console.log(`Successfully seeded ${productsWithIds.length} products!`);

//     process.exit();
//   } catch (error) {
//     console.error("Seeding error:", error);
//     process.exit(1);
//   }
// };

// seedData();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");

const Product = require("./models/Product");
const User = require("./models/User");
const Collection = require("./models/Collection");
const Cart = require("./models/Cart");
const products = require("./data/products");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    console.log("Clearing existing data...");
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Collection.deleteMany();

    // Admin user
    const adminUser = await User.create({
      name: "Shivam",
      email: "shivam1@example.com",
      password: "123456",
      role: "admin",
    });

    // Collections
    const collectionsToSeed = [
      { name: "Prenatal", slug: "prenatal" },
      { name: "Diabetic Care", slug: "diabetic-care" },
      { name: "Ayurvedic Care", slug: "ayurvedic-care" },
      { name: "Pain Relief", slug: "pain-relief" },
      { name: "Sports Nutrition", slug: "sports-nutrition" },
      { name: "Kids Nutritions", slug: "kids-nutrition" },
      { name: "Herbal Supplements", slug: "herbal-supplements" },
      { name: "Nutritional Supplements", slug: "nutritional-supplements" },
    ];

    const seededCollections = await Collection.insertMany(collectionsToSeed);
    console.log(`Seeded ${seededCollections.length} collections`);

    const collectionMap = {};
    seededCollections.forEach((col) => (collectionMap[col.name] = col._id));

    // Prepare products
    const productsWithIds = products.map((product) => ({
      ...product,
      user: adminUser._id,
      slug: slugify(product.name, { lower: true, strict: true }),
      metaTitle: `${product.name} | Maclienson Healthcare`,
      metaDescription: product.description.substring(0, 160),
      metaKeywords: product.tags.join(", "),
      collections: Array.isArray(product.collections)
        ? product.collections.map((name) => collectionMap[name])
        : [collectionMap[product.collections]],
      images: product.images.map((img) => ({ url: img.url, altText: img.altText || product.name })),
    }));

    await Product.insertMany(productsWithIds);
    console.log(`Successfully seeded ${productsWithIds.length} products!`);
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
