const Joi = require("joi");
const JoiValidator = require("./joiValidator");

class UploadsValidator extends JoiValidator {
  validateImageExt(extension) {
    return this.validate({
      extension: Joi.string().valid(".jpg", ".jpeg", ".png", ".svg", ".pdf")
    }, { extension })
  }
  validateCsvPatient(extension) {
    return this.validate({
      extension: Joi.string().valid(".csv", ".xlsx")
    }, { extension })
  }
  validateCsvDiagnoses(extension) {
    return this.validate({
      extension: Joi.string().valid(".csv")
    }, { extension })
  }
}

module.exports = new UploadsValidator();