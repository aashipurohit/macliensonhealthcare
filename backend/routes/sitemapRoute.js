// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product"); 

// router.get("/sitemap.xml", async (req, res) => {
//   try {
//     const baseUrl = "https://www.macliensonhealthcare.com"; 

//     // Fetch all products from database
//     const products = await Product.find({}, "_id updatedAt");

//     // Generate XML for Google
//     const productUrls = products
//       .map((product) => {
//         return `
//       <url>
//         <loc>${baseUrl}/product/${product._id}</loc>
//         <lastmod>${product.updatedAt.toISOString()}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//       </url>`;
//       })
//       .join("");

//     const xml = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       <url>
//         <loc>${baseUrl}</loc>
//         <changefreq>daily</changefreq>
//         <priority>1.0</priority>
//       </url>
//       <url>
//         <loc>${baseUrl}/products</loc>
//         <changefreq>weekly</changefreq>
//         <priority>0.9</priority>
//       </url>
//       ${productUrls}
//     </urlset>`;

//     res.header("Content-Type", "application/xml");
//     res.send(xml);
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//     res.status(500).send("Error generating sitemap");
//   }
// });

// module.exports = router;

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

