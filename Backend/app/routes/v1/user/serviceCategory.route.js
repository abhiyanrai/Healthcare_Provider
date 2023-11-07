const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const serviceCategoryController = require("../../../controllers/user/serviceCategory.controller");


router.post("/create", isAuth, serviceCategoryController.create);
router.get("/all", isAuth, serviceCategoryController.all)
router.patch("/update", isAuth, serviceCategoryController.update)
router.put("/delete", isAuth, serviceCategoryController.delete)
router.get("/byId", isAuth, serviceCategoryController.byId)


module.exports = router;