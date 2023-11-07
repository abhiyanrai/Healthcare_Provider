const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const patientController = require("../../../controllers/user/patient.controller");

router.post("/create", isAuth, patientController.create);
router.get("/all", isAuth, patientController.all);
router.get("/withoutConsultation", isAuth, patientController.withoutConsultation);
router.get("/newPatients", isAuth, patientController.newPatients)
router.get("/regularPatients", isAuth, patientController.regularPatients)
router.get("/byId", isAuth, patientController.byId);
router.patch("/update", isAuth, patientController.update);
router.get("/allPatientData", isAuth, patientController.allPatientData)
router.get("/withExamination", isAuth, patientController.withExamination)
// router.get("/byAuth", isAuth, providerController.byAuth);
// router.get("/allProvider", isAuth, providerController.allProvider);
// router.patch("/changePassword", isAuth, userController.changePassword);

module.exports = router;
