const NotFoundError = require("../../errors/NotFoundError");
const messages = require("../../messages/messages");
const UserSubscription = require("../../model/UserSubscription");
const Transaction = require("../../model/Transaction");
const stripeService = require("../../services/stripe.service");

const stripe = require("stripe")("sk_test_51MgoC1SJ9OgD3edaieQa3I96BlNh8p63SMKJv6ABoIRVb6UU8jumIVz9HuBRXxasY7kEygL0BGtJFnlaffGbGcR3004lBzp9XS");

// const webHookEndPointSecret = "whsec_ca30217935cf4ec0c4fcf3e700a69515923fa564252e71f0a4ee97786f3eb8c1"

const webHookEndPointSecret = "whsec_yky0XcroctpAk4UWcWjPGqKr1UnZxEzs"


async function calculateTotalPrice(item) {
  const price = await stripe.prices.retrieve(item.price);
  const totalPrice = price.unit_amount * item.quantity;
  return totalPrice;
}

class StripeController {

  async subscription(req, res) { 
    // console.log(req.body, "req")
    const { line_items, success_url, cancel_url} = req.body; 
    // console.log(line_items, "LINEKNEKEN")
    
    const { id } = req.user;
    const userSubscription = await UserSubscription.findOne({userId:id});
    // console.log(userSubscription, "userSubscription")
    if(!userSubscription || !userSubscription?.customerId) throw new NotFoundError(messages.notFoundError.user);
    // const customer = await stripeService.createCustomer(email,description);
      
      const session = await stripe.checkout.sessions.create({ 
        mode: "payment",
        customer: userSubscription.customerId,
        payment_method_types: ["card"], 
        billing_address_collection: "required",
        // line_items: [  
        //   {
        //     price,
        //     quantity: 1,
        //   },
        // ], 
        // expires_at: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        line_items,
        metadata:{
          items: JSON.stringify(line_items)
        },
        
        // custom_fields: [{
        //   key: 'company',
        //   label: { type: 'custom', custom: 'Company name' },
        //   type: 'text',
        //   optional: true
        // }],
        // subscription_data: {
        //   trial_period_days: 14, 
        // },
        // success_url: "http://localhost:3000/success", 
        success_url,
        // cancel_url: "http://localhost:3000/cancel", 
        cancel_url,
      }); 
      res.status(200).send({ session }); 
  }



async webhook(request,response) {
  // console.log(request, "Requeststt")
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, webHookEndPointSecret);
  } catch (err) {
    console.log(err, "errr")
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
    const checkoutSession = event.data.object;
    // console.log(checkoutSession, "checkoutSession")
    var count = 0;
    const line_items = JSON.parse(checkoutSession.metadata.items)
    // console.log(line_items, "LineItemsss")
    const priceLineItems = line_items.map((item) => ({
      price: item.price,
      quantity: item.quantity,  
    }));  
    const totalPrices = await Promise.all(
      priceLineItems.map((item) => calculateTotalPrice(item))
    );
    const totalPriceSum = totalPrices.reduce((acc, curr) => acc + curr, 0);
    const userSubscription = await UserSubscription.findOne({customerId: checkoutSession.customer});
    if(userSubscription.paymentCount >= 1 ) {
      // console.log("Hiii We're in second payment section")
      const line_items = JSON.parse(checkoutSession.metadata.items);
      userSubscription.subscriptionStatus = checkoutSession.status;
      userSubscription.noOfHealthCareProvider = line_items[0].quantity + userSubscription.noOfHealthCareProvider;
      userSubscription.paymentCount = userSubscription.paymentCount + 1;
      userSubscription.planTotalPrice = totalPriceSum/100 + userSubscription.planTotalPrice;
      userSubscription.save();
      let transactionHistoryModel = new Transaction({ 
        status: checkoutSession.status,
        userId: userSubscription.userId,
        subscriptionId: userSubscription._id, 
        responseJSON: checkoutSession,
        planName: `${userSubscription.noOfHealthCareProvider} Healthcare Provider`
      })
      transactionHistoryModel = await transactionHistoryModel.save(); 
    } else {  
      let startDateStr = new Date(checkoutSession.created * 1000)
      if (isNaN(startDateStr.getTime())) console.error(`Invalid start date: ${checkoutSession.created}`);
      let newEndDateStr = Math.floor( startDateStr / 1000) + 365 * 24 * 60 * 60;
      newEndDateStr = new Date(newEndDateStr * 1000); 
      newEndDateStr = newEndDateStr.toISOString();
      startDateStr = startDateStr.toISOString(); 
      userSubscription.subscriptionStatus = checkoutSession.status;
      userSubscription.startDate = new Date(startDateStr);
      userSubscription.endDate = new Date(newEndDateStr); 
      userSubscription.responseJSON = checkoutSession;
      if(line_items.length == 2) {
        userSubscription.noOfHealthCareProvider = line_items[1].quantity + 3;
      } else if(line_items.length == 1){
        userSubscription.noOfHealthCareProvider = line_items[0].quantity + 2;
      }
      userSubscription.paymentCount = count + 1;
      userSubscription.planTotalPrice = `${totalPriceSum/100}`; 
      userSubscription.save();
      let transactionHistoryModel = new Transaction({
        status: checkoutSession.status,
        userId: userSubscription.userId,
        subscriptionId: userSubscription._id,
        responseJSON: checkoutSession,
        planName: `Base Plan = ${line_items[0].quantity} Account Owner + ${userSubscription.noOfHealthCareProvider} Healthcare Provider`
      })
      transactionHistoryModel = await transactionHistoryModel.save();
    }
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCapturableUpdated = event.data.object;
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event.data.object;
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
        case 'charge.succeeded':
          break;
      case 'payment_intent.succeeded':
       
        break;
      
    // ... handle other event types
    default:
      // console.log(`Unhandled event type ${event.type}`);
  }
// console.log(event, 'event')
  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send({data:event.data,type: event.type});

}

}

module.exports = new StripeController();