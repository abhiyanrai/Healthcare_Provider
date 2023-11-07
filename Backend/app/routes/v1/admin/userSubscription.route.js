const express = require("express");
const userSubscriptionController = require("../../../controllers/admin/userSubscription.controller")
const router = express.Router();
const isAuth = require("../../../middlewares/isAuth");

router.post("/create", isAuth, userSubscriptionController.create);
router.get("/byId/:id", isAuth, userSubscriptionController.byId);
router.get("/byUserId/:id", isAuth, userSubscriptionController.byUserId);
router.get("/byAuth", isAuth, userSubscriptionController.byAuth);
router.get("/currentSubscriptionByUserId", isAuth, userSubscriptionController.currentSubscriptionByUserId);
router.get("/all", isAuth, userSubscriptionController.all);

module.exports = router;