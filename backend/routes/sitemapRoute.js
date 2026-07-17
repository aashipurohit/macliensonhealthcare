const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true });

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Homepage
    sitemap += `
  <url>
    <loc>https://www.macliensonhealthcare.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Products Page
    sitemap += `
  <url>
    <loc>https://www.macliensonhealthcare.com/products</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

    // Individual products
    products.forEach((product) => {
      sitemap += `
  <url>
    <loc>https://www.macliensonhealthcare.com/product/${product._id}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);

  } catch (error) {
    console.error("Sitemap Error: ", error);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;

