const router = require("express").Router();
const visitDetailController = require("../../../controllers/user/visitDetail.controller");
const visitController = require("../../../controllers/user/visitDetail.controller");
const isAuth = require("../../../middlewares/isAuth");


router.post("/create", isAuth, visitController.create)
router.patch("/updateById", isAuth, visitController.updateVisitById)
router.get("/allByExaminationId", isAuth, visitController.all)
router.get("/byId", isAuth, visitController.byId)
router.get("/all/byPatientId", isAuth, visitDetailController.allByPatientId)

module.exports = router;