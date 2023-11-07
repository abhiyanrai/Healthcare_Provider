const Joi = require("joi");
const JoiValidator = require("./joiValidator");

class PatientValidator extends JoiValidator {

  validatePatientObj(patientObj) {
    return this.validate({
        salutation: Joi.string().required(),
        firstName: Joi.string()
          .required(),
          // .regex(new RegExp("/^[A-Za-z ]+$/"), 'Please enter a valid name'),
          // .max(15, "First Name must be less than 16 characters"),
        lastName: Joi.string()
          .required(),
          // .regex(new RegExp("/^[A-Za-z ]+$/"), 'Please enter a valid name'),
          // // .max(15, "Last Name must be less than 16 characters"),
        gender: Joi.string().required(),
        email: Joi.string()
          .required()
          .email(),
        contactNo: Joi.string()
          .required(),
          // .max(13, "Phone No. should not be greater than 13 digits")
          // .test("Digits only", "The field should have digits only", digitsOnly),
        zipcode: Joi.string()
          .required(),
          // .min(5, "Zip code must be at least 5 characters")
          // .max(10, "Zip code must not exceed 10 characters"),
        city: Joi.string()
          .required(),
          // .matches(/^[A-Za-z ]*$/, 'Please enter a valid city name'),
        dob: Joi.string().required(),
        registrationDate: Joi.string().required(),
        address: Joi.string().required(),
        createdBy: Joi.string().required(),
      }
      , patientObj)
  }
}

module.exports = new PatientValidator();