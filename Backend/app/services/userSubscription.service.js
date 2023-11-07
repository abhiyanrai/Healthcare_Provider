const DataService = require("./data.service");
const UserSubscription = require("../model/UserSubscription");

class UserSubscriptionService extends DataService {

 async create(userSubscriptionObj) {
    let userSubscription = await UserSubscription(userSubscriptionObj);
    userSubscription = await userSubscription.save();
    return userSubscription;
 }
 
 async byId(id) {
    let userSubscriptions = await UserSubscription.findById(id);
    return userSubscriptions;
 }

 async byUserId(userId) {
    let filter = {isDeleted: false,userId,}
    let userSubscriptions = await UserSubscription.find(filter).sort({createdAt:-1});
    return userSubscriptions;
 }
 
 async currentSubscriptionByUserId(userId) {
    let filter = {isDeleted: false,userId,}
    let userSubscriptions = await UserSubscription.findOne(filter).sort({createdAt:-1});
    return userSubscriptions;
 }

 async all() {
    let filter = {isDeleted: false}
    let userSubscriptions = await UserSubscription.find(filter).sort({createdAt:-1});
    return userSubscriptions;
 }

}

module.exports = new UserSubscriptionService();