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
