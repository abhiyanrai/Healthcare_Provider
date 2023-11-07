const router = require("express").Router();
const authRoute = require("./auth.route");
const userSubscriptionRoute = require("./userSubscription.route");
const userRoute = require("./userRoutes")

router.use("/auth", authRoute);
router.use("/userSubscription", userSubscriptionRoute);     
router.use("/",  userRoute);    
router.use("/exports", userRoute)

module.exports = router;
