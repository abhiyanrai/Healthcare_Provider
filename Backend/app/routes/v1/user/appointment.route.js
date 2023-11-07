const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const appointmentController = require("../../../controllers/user/appointment.controller")


router.post("/create", isAuth, appointmentController.create);
router.patch("/update", isAuth, appointmentController.update);
router.get("/all", isAuth, appointmentController.all)
router.get("/allByPatientId", isAuth, appointmentController.allByPatientId)
router.patch("/delete", isAuth, appointmentController.delete)
router.get("/byId", isAuth, appointmentController.getById)
router.get("/trackPatient", isAuth, appointmentController.trackPatientDetails)
router.patch("/cancel", isAuth, appointmentController.cancelAppointment)


module.exports = router;