const path = require("path");
const User = require("../../model/User");
const NotFoundError = require("../../errors/NotFoundError");
const UploadsValidator = require("../../validators/uploads.validator");
const emailService = require("../../services/email.service");

class UploadsController {

  async email(req, res) {
    emailService.local("hihihi", "nikhil@yopmail.com");
  }

}

module.exports = new UploadsController();