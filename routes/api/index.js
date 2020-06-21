const router = require("express").Router();
const mw = require("../../scripts/middleware");

const userRoutes = require("./userRoutes");

// Apply middleware for logging URL endpoints
router.use(mw.logger);

// all routes
router.use("/", userRoutes);

module.exports = router;