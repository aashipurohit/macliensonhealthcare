const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const sitemapRoute = require("./routes/sitemapRoute");


const morgan = require("morgan"); // For better request logging

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");




const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;

//Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to MacliensonAPI !");
} );

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/", sitemapRoute);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});

