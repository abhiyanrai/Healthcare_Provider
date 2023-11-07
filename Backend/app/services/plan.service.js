const DataService = require("./data.service");
const Plan = require("../model/Plan");
const message = require("../messages/messages")
const NotFoundError = require("../errors/NotFoundError");
const PlanPrice = require("../model/PlanPrice");
const stripeService = require("./stripe.service");

class PlanService extends DataService {
  async update(id, update) {
    let plan = await Plan.findByIdAndUpdate(id,update, {new:true}).populate("planPriceId");
    if (!plan) throw new NotFoundError(message.plan.notExisted);
    return plan;
  }

  async updatePrice(id, update) {
    let planPrice = new PlanPrice({planId:id, price: update.price});
    planPrice = await planPrice.save();
    // let plan = await Plan.findByIdAndUpdate(id,{planPriceId: planPrice._id}, {new:true}).populate("planPriceId");
    let plan = await Plan.findOne({_id:id});
    if (!plan) throw new NotFoundError(message.plan.notExisted);
    plan.planPriceId = planPrice._id;

    let price = await stripeService.createPrice(planPrice,plan.stripeProductId);
    plan.stripePriceId = price.id
    plan = await plan.save();
    plan = await plan.populate("planPriceId");
    return plan;
  }

  async create(planObj) {
    let plan = new Plan(planObj);
    plan = await plan.save();
    let planPrice = new PlanPrice({planId: plan._id, price: planObj.price});
    planPrice = await planPrice.save();
    plan.planPriceId = planPrice._id;
    plan = await plan.populate("planPriceId");
    let product = await stripeService.createProduct(plan);
    let price = await stripeService.createPrice(plan.planPriceId,product.id);
    plan.stripeProductId = product.id,
    plan.stripePriceId = price.id,
    plan = await plan.depopulate("planPriceId");
    plan = await plan.save();
    plan = await plan.populate("planPriceId");
    return plan;
  }

  async all(filter) {
    return await Plan.find(filter).sort({ createdAt: -1 }).populate("planPriceId");
  }
  
}

module.exports = new PlanService();