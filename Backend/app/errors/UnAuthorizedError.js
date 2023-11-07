class UnAuthorizedError extends Error {
   constructor(message = "Unauthorized access") {
      super(message);
      this.name = "Unauthorized access";
      Error.captureStackTrace(this, UnAuthorizedError);
   }
}

module.exports = UnAuthorizedError;