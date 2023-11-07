class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.name = "Bad Request"
  }
}

module.exports = BadRequestError;
