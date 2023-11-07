const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const patientBillingController = require("../../../controllers/user/patientBilling.controller");


router.post("/create", isAuth, patientBillingController.create);
router.patch("/update", isAuth, patientBillingController.update);
router.put("/delete", isAuth, patientBillingController.delete)
router.get("/all/byPatientId", isAuth, patientBillingController.allByPatientId);
router.get("/byId", isAuth, patientBillingController.byId)
router.get("/checkBilling", isAuth, patientBillingController.checkBillingCreated)
router.post("/payableAmount", isAuth, patientBillingController.payableAmount)
router.patch("/billCancelledById", isAuth, patientBillingController.billCancelledById)


module.exports = router;