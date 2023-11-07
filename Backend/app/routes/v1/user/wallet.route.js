const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const Wallet = require("../../../controllers/user/wallet.controller");

router.post("/createAndUpdate", isAuth, Wallet.createAndUpdate)
router.get("/getWalletByPatientId", isAuth, Wallet.getWalletByPatientId)

module.exports = router;
