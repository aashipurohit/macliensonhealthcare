const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const formatDate = (date) => date.toISOString().slice(0, 10);

router.get("/sales", protect, admin, async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start30DaysAgo = new Date(startOfToday);
    start30DaysAgo.setDate(start30DaysAgo.getDate() - 29);

    const aggregated = await Order.aggregate([
      {
        $match: {
          status: { $ne: "Cancelled" },
          createdAt: { $gte: start30DaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const aggregatedMap = new Map(
      aggregated.map((entry) => [
        entry._id,
        { revenue: entry.revenue || 0, orders: entry.orders || 0 },
      ])
    );

    const daily = [];
    for (let index = 0; index < 30; index += 1) {
      const date = new Date(start30DaysAgo);
      date.setDate(start30DaysAgo.getDate() + index);
      const key = formatDate(date);
      const entry = aggregatedMap.get(key) || { revenue: 0, orders: 0 };

      daily.push({
        date: key,
        revenue: entry.revenue,
        orders: entry.orders,
      });
    }

    const last30Days = daily.reduce(
      (totals, entry) => ({
        sales: totals.sales + entry.revenue,
        orders: totals.orders + entry.orders,
      }),
      { sales: 0, orders: 0 }
    );

    const last7Days = daily.slice(-7).reduce(
      (totals, entry) => ({
        sales: totals.sales + entry.revenue,
        orders: totals.orders + entry.orders,
      }),
      { sales: 0, orders: 0 }
    );

    res.json({
      totals: {
        last7Days,
        last30Days,
      },
      daily,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
