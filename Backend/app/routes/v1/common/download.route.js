const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const downlaodController = require("../../../controllers/common/download.controller")

router.get("/csv-format",  downlaodController.csvFormat);
router.get("/diagnoses-format",  downlaodController.csvDiagnosesFormat);


module.exports = router;