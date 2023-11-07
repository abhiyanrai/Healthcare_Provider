const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const dropdownModelController = require("../../../controllers/user/dropdown_models.controller");
const dropdownOptionController = require("../../../controllers/user/dropdown_options.controller")


router.post("/model/create", isAuth, dropdownModelController.create);
router.get("/model/all", isAuth, dropdownModelController.all);
router.post("/option/create", isAuth, dropdownOptionController.create);
router.patch("/option/update", isAuth, dropdownOptionController.update);
router.put("/option/delete", isAuth, dropdownOptionController.delete);
router.get("/option/all/bymodelId", isAuth, dropdownOptionController.all)



module.exports = router;