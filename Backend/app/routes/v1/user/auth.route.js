const router = require("express").Router();
const authController = require("../../../controllers/user/auth.controller");
const isAuth = require("../../../middlewares/isAuth");

// router.post("/register", authController.register);
router.post("/registerOwner", authController.registerAccountOwner);
router.post("/loginOwner", authController.loginAccountOwner)
// router.post("/sendOtp", authController.sendOtp);
// router.post("/verifyOtp", authController.verifyOtp);
router.post("/registerProvider", isAuth, authController.registerProvider);
router.post("/saveAndSendProvider", isAuth, authController.saveAndSendProvider);
router.post("/sendProvider", isAuth, authController.sendProvider);
router.post("/loginProvider", authController.loginProvider);


module.exports = router;