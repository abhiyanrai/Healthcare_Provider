const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const User = require("../model/User");
const UnAuthorizedError = require("../errors/UnAuthorizedError");
const { SECRET_ACCESS_KEY } = process.env;

module.exports = async (req, res, next) => {
  // const excludedRoutes = [
  //   "/api/v1/user/auth/loginOwner",
  //   "/api/v1/user/auth/registerOwner",
  //   "/api/v1/user/auth/loginProvider",
  //   "/api/v1/admin/auth/login",
  //   "/api/v1/admin/auth/register"  
  // ];
  // console.log(req.path, "Pathhhss")
  // if (excludedRoutes.includes(req.path)) {
  //   // console.log("found")
  //   return next();
  // }
    let token = req.headers.authorization;
  if (!token) throw new BadRequestError("Authorization token is required");
  token = token.split(" ")[1];
  if (!token) throw new BadRequestError("Authorization token is required");
  const decodedToken = jwt.verify(token, SECRET_ACCESS_KEY);
  const data = await User.findOne({email:  decodedToken.email, _id: decodedToken.id})
  if(data) {
  req.user = decodedToken;
  next();
  } else {
    throw new UnAuthorizedError('User not found')
  }
}