const express = require("express");
const authController = require("../../../controllers/admin/auth.controller")
const router = express.Router();
const isAuth = require("../../../middlewares/isAuth");

router.post("/register", authController.adminRegister);
router.post("/login", authController.login);




module.exports = router;
