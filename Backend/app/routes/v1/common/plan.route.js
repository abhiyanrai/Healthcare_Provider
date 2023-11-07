const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const PlanController = require("../../../controllers/common/plan.controller");

router.post("/create", isAuth, PlanController.create);
router.get("/all", isAuth, PlanController.all);
router.get("/byId", isAuth, PlanController.byId);
router.patch("/update", isAuth, PlanController.update);
router.patch("/updatePrice", isAuth, PlanController.updatePrice);

module.exports = router;