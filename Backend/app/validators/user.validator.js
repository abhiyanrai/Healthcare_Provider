const Joi = require("joi");
const JoiValidator = require("./joiValidator")

class UserValidator extends JoiValidator {
  validateUdpateUser(obj) {
    return this.validate({
      firstName: Joi.string().min(3).max(50),
      lastName: Joi.string().min(3).max(50).allow(""),
      profilePic: Joi.string(),
    }, obj)
  }
}

module.exports = new UserValidator();