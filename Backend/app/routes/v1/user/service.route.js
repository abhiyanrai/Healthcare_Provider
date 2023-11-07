const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const serviceController = require("../../../controllers/user/service.controller");


router.post("/create", isAuth, serviceController.create);
router.get("/all", isAuth, serviceController.all)
router.patch("/update", isAuth, serviceController.update)
router.put("/delete", isAuth, serviceController.delete) 
router.get("/getById", isAuth, serviceController.getById)


module.exports = router;