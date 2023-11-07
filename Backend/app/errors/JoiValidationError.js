class JoiValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "Joi Validation Error"
  }
}

module.exports = JoiValidationError;