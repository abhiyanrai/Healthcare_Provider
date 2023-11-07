const router = require("express").Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const providerRoute = require("./provider.route");
const patientRoute = require("./patient.route");
const consultationRoute = require("./consultation.route");
const roomRoute = require("./room.route");
const serviceRoute = require("./service.route");
const appointmentRoute = require("./appointment.route")
const examinationRoute = require("./examination.route");
const visitDetailRoute = require("./visitDetail.route");
const dropdownRoute = require("./dropdown.route")
const serviceCategoryRoute = require("./serviceCategory.route")
const patientBillingRoute  = require("./patientBilling.route")
const clinicScheduleRoute = require("./clinicSchedule.route")
const walletRoute = require("./wallet.route")

router.use("/", userRoute);
router.use("/auth", authRoute);
router.use("/provider", providerRoute);
router.use("/patient", patientRoute);
router.use("/consultation", consultationRoute);
router.use("/clinicSchedule", clinicScheduleRoute)  
router.use("/room", roomRoute);
router.use("/service", serviceRoute);
router.use("/appointment", appointmentRoute);
router.use("/examination", examinationRoute);
router.use("/visitDetail", visitDetailRoute);
router.use("/dropdown", dropdownRoute);
router.use("/serviceCategory", serviceCategoryRoute);
router.use("/patient/billing", patientBillingRoute);
router.use("/wallet",  walletRoute)


module.exports = router;
