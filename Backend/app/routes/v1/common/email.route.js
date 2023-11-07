const router = require("express").Router();
const emailController = require("../../../controllers/common/email.controller");
const isAuth = require("../../../middlewares/isAuth");

router.post("/email", isAuth, emailController.email);

module.exports = router