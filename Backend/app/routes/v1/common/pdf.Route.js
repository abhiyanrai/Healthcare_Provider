const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const pdfController = require("../../../controllers/common/pdf.controller")

router.get("/patient/billing",  pdfController.createBillingPdf);
router.get("/patient/billingHtml",  pdfController.billingHtml);


module.exports = router;