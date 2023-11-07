const router = require("express").Router();
const userController = require("../../../controllers/admin/user.controller");
const isAuth = require("../../../middlewares/isAuth");

router.get("/dashboard/all", isAuth, userController.allAdminData);
router.get("/accountOwner/byId", isAuth, userController.getOwnerById)
router.get("/accountOwners", isAuth, userController.exportsAccountOwners)
router.get("/providers", isAuth, userController.exportsProviders)
router.get("/patients", isAuth, userController.exportsPatients)

module.exports = router;