const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const JoiValidator = require("./joiValidator");

class userSubscriptionValidator extends JoiValidator {
  create(obj) {
    return this.validate({
    responseJSON: Joi.string().min(3).max(50), //optional
    endDate: Joi.date().iso(), //optional
    startDate: Joi.date().iso(), //optional
    subscriptionStatus: Joi.string(), //optional
    noOfHealthCareProvider: Joi.number(), //optional
    userId: Joi.objectId().required(),
    }, obj )
  }
}

module.exports = new userSubscriptionValidator();