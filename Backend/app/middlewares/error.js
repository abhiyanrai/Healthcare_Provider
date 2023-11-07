const { JsonWebTokenError } = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const JoiValidationError = require("../errors/JoiValidationError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnAuthorizedError")

module.exports = (err, req, res, next) => {
  let { status, message } = err;
  console.log(err, "error in middleware")
  if (err instanceof JoiValidationError ||
    err instanceof JsonWebTokenError ||
    err instanceof BadRequestError) {
    status = 400;
  }
  if (err instanceof NotFoundError) {
    status = 404;
  }
  if (err instanceof UnauthorizedError) {
    status = 401;
  }
  if (!status) {
    status = 500;
    message = "Internal Server Error"
  }
  return res.status(status).send({ status, message, err, });
} 