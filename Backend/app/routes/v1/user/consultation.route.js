const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const consultationController = require("../../../controllers/user/consultation.controller");

router.post("/create", isAuth, consultationController.create);
router.get("/all", isAuth, consultationController.all);
router.post("/addSymptoms", isAuth, consultationController.addSymptoms);
router.patch("/updateSymptom", isAuth, consultationController.updateSymptom)
router.get("/recent", isAuth, consultationController.recent);
router.get("/byPatientId", isAuth, consultationController.byPatientId);
router.get("/byId", isAuth, consultationController.byId);
router.patch("/update", isAuth, consultationController.update);
router.get("/symptomById", isAuth, consultationController.symptomById)

module.exports = router;