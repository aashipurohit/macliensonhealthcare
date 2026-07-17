const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db");

// Routes
const sitemapRoute = require("./routes/sitemapRoute");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");

const app = express();

/* -------------------- SAFE MIDDLEWARE -------------------- */
app.set("etag", false);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* -------------------- DATABASE -------------------- */

connectDB();

/* -------------------- HEALTH -------------------- */

app.get("/", (req, res) => {
  res.send("Maclienson API running");
});

/* -------------------- ROUTES -------------------- */

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

// Sitemap
app.use("/", sitemapRoute);

/* -------------------- ERROR HANDLER -------------------- */

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ message: "Server error" });
});

/* -------------------- START -------------------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});