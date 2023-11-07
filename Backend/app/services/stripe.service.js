// const UserSubscription = require("../model/UserSubscription");
const User = require("../model/User");
const UserSubscription = require("../model/UserSubscription");

const stripe = require("stripe")("sk_test_51MgoC1SJ9OgD3edaieQa3I96BlNh8p63SMKJv6ABoIRVb6UU8jumIVz9HuBRXxasY7kEygL0BGtJFnlaffGbGcR3004lBzp9XS");
// whsec_ca30217935cf4ec0c4fcf3e700a69515923fa564252e71f0a4ee97786f3eb8c1 webhook signing secret
class SripeService {

 async createCustomer(user, description ='New Customer') {
   
   const userSubscription = await UserSubscription.findOne({userId: user._id});
   if (userSubscription && userSubscription.customerId) {
      const existed = await stripe.customers.retrieve(userSubscription.customerId);
      return {userSubscription,customer:existed};
   } else  {
      const customer = await stripe.customers.create({
         email: user.email,
         description
        })
      //   console.log(customer, "OOO")
      const userSubscription = new UserSubscription({
         userId: user._id,
         customerId: customer.id
      })
      await userSubscription.save();
      return {userSubscription,customer};  
   }
  
 }

 async createProduct(plan) {
   const product = await stripe.products.create({
      name: plan.name,
    });
    return product
 }

 async createPrice(planPrice, productId) {
   const price = await stripe.prices.create({
      unit_amount: parseInt(planPrice.price * 100),
      currency: 'eur',
      // recurring: {interval: 'day'},
      // recurring: {
      //    interval: 'year',
      //    // interval_count: 1
      //  },
      product: productId,
    });
    return price
 }


}

module.exports = new SripeService();