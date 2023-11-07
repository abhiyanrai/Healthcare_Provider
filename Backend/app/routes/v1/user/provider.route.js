const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const scheduleController = require("../../../controllers/user/clinicSchedule.controller")
const providerController = require("../../../controllers/user/provider.controller");
const patientController = require("../../../controllers/user/patient.controller");
const consultationController = require("../../../controllers/user/consultation.controller")
const examinationController = require("../../../controllers/user/examination.controller")
const servicesController = require("../../../controllers/user/service.controller")
const roomsController = require("../../../controllers/user/room.controller")
const appointmentController = require("../../../controllers/user/appointment.controller")
const patientBillingController = require("../../../controllers/user/patientBilling.controller")
const visitDetailController = require("../../../controllers/user/visitDetail.controller")
const dropdownOptionsController = require("../../../controllers/user/dropdown_options.controller")
const dropdownModelController = require("../../../controllers/user/dropdown_models.controller")

router.get("/byAuth", isAuth, providerController.byAuth);
router.get("/byId", isAuth, providerController.byId);
router.patch("/deleteProvider", isAuth, providerController.deleteProvider)
router.get("/allProvider", isAuth, providerController.allProvider);
router.patch("/update", isAuth, providerController.update);
router.post("/createPatient", isAuth, patientController.create);
router.get("/patient/all", isAuth, patientController.all)
router.get("/patient/trackPatient", isAuth, appointmentController.trackPatientDetails)
router.get("/newPatients", isAuth, patientController.newPatients)
router.get("/regularPatients", isAuth, patientController.regularPatients)
router.get("/patient/byId", isAuth, patientController.byId)
router.patch("/patient/update", isAuth, patientController.update);
router.get("/patient/withoutConsultation", isAuth, patientController.withoutConsultation)
router.post("/createConsultation", isAuth, consultationController.create)
router.get("/consultation/byId", isAuth, consultationController.byId)
router.patch("/consultation/update", isAuth, consultationController.update);
router.post("/consultation/addSymptoms", isAuth, consultationController.addSymptoms)
router.patch("/consultation/updateSymptom", isAuth, consultationController.updateSymptom)
router.get("/consultation/symptomById", isAuth, consultationController.symptomById)
router.get("/consultation/all", isAuth, consultationController.all);
router.get("/consultation/recent", isAuth, consultationController.recent)
router.post("/createExamination", isAuth, examinationController.create);
router.get("/examination/byId", isAuth, examinationController.getExaminationById)
router.patch("/examination/updateById", isAuth, examinationController.updateExaminationById)
router.get("/service/all", isAuth, servicesController.all);
router.get("/room/all", isAuth, roomsController.all);
router.post("/createAppointment", isAuth, appointmentController.create);
router.get("/appointment/all", isAuth, appointmentController.all);
router.get("/appointment/byId", isAuth, appointmentController.getById)
router.patch("/appointment/update", isAuth, appointmentController.update);
router.patch("/appointment/delete", isAuth, appointmentController.delete);
router.get("/appointment/allByPatientId", isAuth, appointmentController.allByPatientId)
router.post("/billing/create", isAuth, patientBillingController.create);
router.patch("/billing/update", isAuth, patientBillingController.update);
router.put("/billing/delete", isAuth, patientBillingController.delete)
router.get("/billing/byId", isAuth, patientBillingController.byId);
router.get("/billing/all/byPatientId", isAuth, patientBillingController.allByPatientId);
router.get("/getScheduleDetails", isAuth, scheduleController.getByAccountOwner);
router.post("/visitDetail/create", isAuth, visitDetailController.create);
router.patch("/visitDetail/updateById", isAuth, visitDetailController.updateVisitById)
router.get("/visitDetail/byId", isAuth, visitDetailController.byId);
router.get("/visitDetail/allByExaminationId", isAuth, visitDetailController.all);
router.get("/getVisitByPatientId", isAuth, visitDetailController.allByPatientId);
router.get("/options/byModelId", isAuth, dropdownOptionsController.all)
router.get("/dropdown/models/all", isAuth, dropdownModelController.all)

module.exports = router;