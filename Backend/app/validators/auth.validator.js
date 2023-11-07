const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const JoiValidator = require("./joiValidator");

class AuthValidator extends JoiValidator {
  
  validateRegister(obj) {
    return this.validate(
      {
        salutation: Joi.string().required(),
        firstName: Joi.string().min(3).max(50).required(),  
        lastName: Joi.string().min(3).max(50),
        email: Joi.string().email().required(),
        password: JoiPassword.string().min(8).minOfSpecialCharacters(1).minOfUppercase(1).minOfNumeric(1).required(),
      },
      obj
    );
  }

  validateRegisterAccountOwner(obj) {
    return this.validate(
      {
        salutation: Joi.string().required(),
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50),
        email: Joi.string().email().required(),
        password: JoiPassword.string().min(8).minOfSpecialCharacters(1).minOfUppercase(1).minOfNumeric(1).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
      },
      obj
    );
  }

  validateProviderRegister(obj) {
    return this.validate(
      {
        salutation: Joi.string().required(),
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50),
        profilePic: Joi.string().allow(""),
        email: Joi.string().required(),
        specialization: Joi.string().required(),
        address: Joi.string().required(),
        // experience: Joi.string().required().empty(),
        contactNo: Joi.string().required(),
      },
      obj
    );
  }

  validateUserRegister(obj) {
    return this.validate(
      {
        salutation: Joi.string().required(),
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50),
        email: Joi.string().email().required(),
      },
      obj
    );
  }

  validateEmailAndOtp(obj) {
    return this.validate(
      {
        email: Joi.string().email().required(),
        otp: Joi.string().min(6).max(7).required(),
        acceptCheckbox: Joi.boolean().default(false).required(),
      },
      obj
    );
  }

  validateLogin(obj) {
    return this.validate(
      {
        email: Joi.string().required(),
        password: Joi.string().required(),
        acceptCheckbox: Joi.boolean().default(false).required(),
      },
      obj
    );
  }

  validateChangePassword(obj) {
    return this.validate(
      {
        oldPassword: JoiPassword.string().required(),
        newPassword: JoiPassword.string().min(8).minOfSpecialCharacters(1).minOfUppercase(1).minOfNumeric(1).required(),
        confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }) 
      },
      obj
    );
  }

}

module.exports = new AuthValidator();
