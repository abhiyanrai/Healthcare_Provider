const router = require("express").Router();
const uploadsRoute = require("./uploads.route");
const emailRoute = require("./email.route");
const planRoute = require("./plan.route");
const stripeRoute = require("./stripe.route");
const pdfRoute = require("./pdf.Route")
const downloadRoute = require("./download.route")

router.use("/uploads", uploadsRoute);
router.use("/email", emailRoute);
router.use("/plan", planRoute);
router.use("/stripe",  stripeRoute);
router.use("/pdf", pdfRoute)
router.use("/download", downloadRoute)

module.exports = router;