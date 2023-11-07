const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const JoiValidationError = require("../errors/JoiValidationError");

class JoiValidator {
  validate(joiSchema, obj) {
    const objectSchema = Joi.object(joiSchema);
    const { value, error } = objectSchema.validate(obj);
    if (error) throw new JoiValidationError(error.details[0].message);
    return value;
  }
  validateObjectId(id) {
    return this.validate({
      id: Joi.objectId().required()
    }, { id })
  }
  validateEmail(email) {
    return this.validate({
      email: Joi.string().email()
    }, { email })
  }
  validateOtp(otp) {
    return this.validate({
      otp: Joi.string().min(6).max(7)
    }, { otp })
  }

}

module.exports = JoiValidator