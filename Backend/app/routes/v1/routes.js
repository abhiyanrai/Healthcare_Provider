const router = require("express").Router();
const adminRoutes = require("./admin/adminRoutes");
const userRoutes = require("./user/userRoutes");
const commonRoutes = require("./common/commonRoutes");

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/common", commonRoutes);

module.exports = router;
