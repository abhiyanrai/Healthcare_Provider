const User = require("../model/User");
const UnauthorizedError = require("../errors/UnAuthorizedError");

async function checkUserExists(req, res, next) {
    const excludedRoutes = [
        "/user/auth/loginOwner",
        "/user/auth/registerOwner",
        "/admin/auth/register", 
        "/admin/auth/login",
        "/common/download/csv-format",
        "/common/pdf/patient/billing",
        "/user/auth/loginProvider",
      ];
      // console.log(req.path, "what")
      if (excludedRoutes.includes(req.path)) {
        // console.log("found")
        return next();
      }  
   const { id } = req.user;
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkUserExists;