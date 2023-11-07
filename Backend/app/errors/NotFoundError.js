class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.name = "Not Found"
  }
}

module.exports = NotFoundError;