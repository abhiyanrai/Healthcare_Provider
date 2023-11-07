const router = require("express").Router();
const isAuth = require("../../../middlewares/isAuth");
const roomController = require("../../../controllers/user/room.controller");


router.post("/create", isAuth, roomController.create);
router.get("/all", isAuth, roomController.all)
router.patch("/update", isAuth, roomController.update)
router.put("/delete", isAuth, roomController.delete)
router.get("/byId", isAuth, roomController.byId)


module.exports = router;