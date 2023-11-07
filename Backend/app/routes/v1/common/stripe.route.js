const express = require("express");
const router = express.Router();
const stripeController = require("../../../controllers/common/stripe.controller");
const isAuth = require("../../../middlewares/isAuth");


router.post("/subscription", isAuth, stripeController.subscription);
// router.post("/webhook", express.raw({ type: 'application/json' }), stripeController.webhook);

module.exports = router;    