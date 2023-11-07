const router = require("express").Router();
const uploadsController = require("../../../controllers/common/uploads.controller");
const isAuth = require("../../../middlewares/isAuth");

router.post("/file", isAuth, uploadsController.file);
router.post("/csv-file", isAuth, uploadsController.csvFile)
router.post("/csv-diagnoses", isAuth, uploadsController.csvDiagnoses)

module.exports = router;