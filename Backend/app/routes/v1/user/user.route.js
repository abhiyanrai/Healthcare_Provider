const router = require("express").Router();
const userController = require("../../../controllers/user/user.controller");
const isAuth = require("../../../middlewares/isAuth");

router.get("/byAuth", isAuth, userController.byAuth);
router.get("/transaction/all", isAuth, userController.transactionHistory);
router.patch("/update", isAuth, userController.update);
router.patch("/updateById", isAuth, userController.updateById);
router.patch("/changePassword", isAuth, userController.changePassword);
router.patch("/forgotPassword",  userController.forgotPassword);
router.get("/dashboard/all", isAuth, userController.all);
router.post("/set-invoice-number", isAuth, userController.setInvoiceNumber)
router.post("/createAndUpdateClinicProfile", isAuth, userController.createAndUpdateClinicProfile)
router.get("/getClinicDetailsById", isAuth, userController.getClinicDetailsById);
router.post("/createAndUpdateBankDetails", isAuth, userController.createAndUpdateBankDetails)
router.get("/getBankDetailsById", isAuth, userController.getBankDetailsById);

module.exports = router;