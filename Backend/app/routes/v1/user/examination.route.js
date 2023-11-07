const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const examinationController = require("../../../controllers/user/examination.controller");

router.post("/create", isAuth, examinationController.create);
router.get("/byId", isAuth, examinationController.getExaminationById)
router.get("/byConsultationId", isAuth, examinationController.checkExamination)
router.patch("/updateById", isAuth, examinationController.updateExaminationById)
router.get("/allByConsultationId", isAuth, examinationController.allByConsultationId)

module.exports = router;