const messages = require("../../messages/messages");
const userSubscriptionService = require("../../services/userSubscription.service");
const userSubscriptionValidator = require("../../validators/userSubscription.validator");

class UserSubscriptionController {

  async create(req, res) {

    // let user = userSubscriptionValidator.create(req.body);      

    const userSubscription = await userSubscriptionService.create(req.body);

    res.status(201).send({ message: messages.userSubscription.create, userSubscription });
  }
  async byId(req, res) {
    
    // let user = userSubscriptionValidator.create(req.body);  
    const {id} = req.params;

    const userSubscription = await userSubscriptionService.byId(id);

    res.status(201).send({ message: messages.userSubscription.byId, userSubscription });
  }
  async byUserId(req, res) {
    
    // let user = userSubscriptionValidator.create(req.body);  
    const {id} = req.params;

    const userSubscriptions = await userSubscriptionService.byUserId(id);

    res.status(201).send({ message: messages.userSubscription.byUserId, userSubscriptions });
  }
  async byAuth(req, res) {
    
    // let user = userSubscriptionValidator.create(req.body);  
    const {id} = req.user;

    const userSubscriptions = await userSubscriptionService.byUserId(id);

    res.status(201).send({ message: messages.userSubscription.byUserId, userSubscriptions });
  }
  async currentSubscriptionByUserId(req, res) {
    
    // let user = userSubscriptionValidator.create(req.body);  
    const {id} = req.user;

    const userSubscriptions = await userSubscriptionService.currentSubscriptionByUserId(id);

    res.status(201).send({ message: messages.userSubscription.currentByUserId, userSubscriptions });
  }
  async all(req, res) {
    
    // let user = userSubscriptionValidator.create(req.body);  

    const userSubscriptions = await userSubscriptionService.all();

    res.status(201).send({ message: messages.userSubscription.all, userSubscriptions });
  }
}

module.exports = new UserSubscriptionController();