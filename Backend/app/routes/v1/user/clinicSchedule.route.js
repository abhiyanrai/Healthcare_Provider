const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const clinicSchedule = require("../../../controllers/user/clinicSchedule.controller");

router.post("/createAndUpdate", isAuth, clinicSchedule.createAndUpdate)
router.get("/getByAccountOwner", isAuth, clinicSchedule.getByAccountOwner)
// router.get("/all", isAuth, clinicSchedule.allScheduleDetails)
// router.patch("/update", isAuth, clinicSchedule.updateSchedule)
router.delete("/holidays", isAuth, clinicSchedule.deleteHoliday)

module.exports = router;
// holidays/:holidayId", deleteHoliday