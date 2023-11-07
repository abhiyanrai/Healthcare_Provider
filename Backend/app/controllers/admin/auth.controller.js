const User = require("../../model/User");
const authValidator = require("../../validators/auth.validator");
const bcrypt = require("bcryptjs");
const NotFoundError = require("../../errors/NotFoundError");
const BadRequestError = require("../../errors/BadRequestError");
const message = require("../../messages/messages")
const Provider = require("../../model/Provider")
const Patient = require("../../model/Patient")
const userService = require("../../services/user.service");

class AuthController {

  async adminRegister(req, res) {

    let user = authValidator.validateRegister(req.body);      

    const token = await userService.createSuperAdmin({ email: user.email }, user);

    res.status(201).send({ message: "User registered successfully", token });
  }
  
  async login(req, res) { 
    let currUser = authValidator.validateLogin(req.body);
    const existedUser = await User.findOne({ email: currUser.email });
    if (!existedUser) throw new BadRequestError(message.user.notExisted);
    if(existedUser.role == "Super admin") {
      const token = await userService.verifyAdminOrOwnerOrProvider(currUser, existedUser);
      res.status(200).send({ message: "User login successfully", token });
    } else {
      throw new BadRequestError(message.user.adminRole)
    }
  }




}

module.exports = new AuthController();