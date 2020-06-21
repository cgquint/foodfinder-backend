const router = require("express").Router();
const apiRoutes = require("./api");
const mw = require("../scripts/middleware");

router.use("/api", apiRoutes);
router.use(mw.logger);

module.exports = router;