const path = require("path");
const Plan = require("../../model/Plan");
const NotFoundError = require("../../errors/NotFoundError");
const UploadsValidator = require("../../validators/uploads.validator");
const _ = require("lodash");
const message = require("../../messages/messages");
const planService = require("../../services/plan.service");
const PlanPrice = require("../../model/PlanPrice");

class PlanController {

  async create(req, res) {
    const plan = await planService.create(req.body);
    res.status(201).send({ message: message.plan.registered, plan })
  }

  async all(req, res) {
    const allPlans = await planService.all({ isActive: true });
    res.status(200).send({ message: message.plan.all, allPlans });
  }
  
  async byId(req, res) {
    // const { id } = UserValidator.validateObjectId(req.query.id);
    const { id } = req.query;
    const plan = await Plan.findOne({ _id: id }).populate("planPriceId");
    // console.log(plan, "Plann")
    const planPrices = await PlanPrice.find({planId:plan._id, isActive:true}).sort({createdAt:-1});
    res.status(200).send({ message: message.plan.byId, plan, planPriceHistory: planPrices });
  }

  async update(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    
    const plan = await planService.update(req.body.id, update);
    res.status(200).send({ message: message.plan.update, plan });
  }

  async updatePrice(req,res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const plan = await planService.updatePrice(req.body.id, update);
    res.status(200).send({ message: message.plan.updatePrice, plan });
  }


}

module.exports = new PlanController();