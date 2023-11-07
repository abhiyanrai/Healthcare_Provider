const patientBillingService = require("../../services/patientBilling.service")
const message = require("../../messages/messages")
const _ = require("lodash")
const UserValidator = require("../../validators/user.validator");
const billingModel = require("../../model/patientBilling")
const Patient = require("../../model/Patient");
const BadRequestError = require("../../errors/BadRequestError");
const Wallet = require("../../model/patientWallet")
const Service = require("../../model/Services");
const messages = require("../../messages/messages");

class patientBillingController {


    async payableAmount(req, res) {

      const { discountPercentage, servicesToBuy } = req.body;

     let totalAmountWithTax = 0;

     for (const serviceData of servicesToBuy) {

        const { serviceId } = serviceData;

        const service = await Service.findOne({ _id: serviceId });
         if (!service) {
           break;
         }
      totalAmountWithTax = totalAmountWithTax + service.amount;
  
    }
      let totalDiscount = 0;
      if (discountPercentage) {
        const discountApplied = discountPercentage / 100;
        totalDiscount = totalAmountWithTax * discountApplied;
      }
    
      const dueAmount = totalAmountWithTax - totalDiscount;
    
      res.status(200).send({
        totalAmount: totalAmountWithTax,
        discountAmount:totalDiscount,
        billAmount: dueAmount,
        discountApplied:discountPercentage
      });
    }
    
  
    

    async create(req, res) {
        const { id: createdBy, role } = req.user;
        const billingObject = req.body;   
        const { patientBilling, updatedWalletAmount } = await patientBillingService.create(billingObject, createdBy, role)
        res.status(201).send({ message: message.patientBilling.created, patientBilling, updatedWalletAmount })
    }

    async update(req, res) {
        const update = _.pick(req.body, _.without(_.keys(req.body), "id")); 
        // console.log(update, "updateeeee")
        const patientBilling = await patientBillingService.update(req.body.id, update);
        res.status(200).send({ message: message.patientBilling.update, patientBilling });
    }

    async delete(req, res) {
         const filter = { isDeleted: true }
         const patientBilling = await patientBillingService.delete(req.body.id, filter);
         res.status(200).send({message: message.patientBilling.delete, patientBilling})
    }

    async allByPatientId(req, res) {
      const { id } = UserValidator.validateObjectId(req.query.id)
      const filter = { isDeleted: false, patientId: id }
      const allBillingData = await patientBillingService.all(filter)
      res.status(200).send({message: message.patientBilling.all, allBillingData})
    }

    async byId(req, res) {
        const { id } = UserValidator.validateObjectId(req.query.id);
        let patientBilling = await billingModel.findOne({ _id: id }).populate("patientId");
        if(!patientBilling) throw new BadRequestError({ message: messages.patientBilling.notFound})
        patientBilling = JSON.parse(JSON.stringify(patientBilling))
        let taxAdded = 0;
        patientBilling.orderJson.map((order) => {
          if(order.amount && order.text) {
            taxAdded = order.text.reduce((acc, text) => {  
             return acc + text.value;
            }, 0)
            const taxPercentage = taxAdded / 100;
            const taxValue = order.amount * taxPercentage;
            const totalAmountWithTax = order.amount + taxValue;
            order.actualAmount = totalAmountWithTax || order.amount ;
        } else {
         order.actualAmount = order.amount;
        }
        return order;
        })
        res.status(200).send({ message: message.patientBilling.byId, patientBilling });
    }


    async checkBillingCreated(req, res) {
        const { id } = req.query;
        // console.log(id)
        const isBillingFound = await billingModel.findOne({patientId: id})
        if(isBillingFound) res.status(200).send({message: "Patient billing found", isBillingFound: true})
        res.status(200).send({message: "Patient billing not found", isBillingFound: false})
    }



    async billCancelledById(req, res) {

      const { id: billId } = req.body;

      try {
        const bill = await billingModel.findOne({ _id: billId });
    
        if (!bill) {
          throw new Error("Bill not found");
        }
    
        if (bill.isCancelled) {
          throw new Error("Bill is already cancelled");
        }
    
        bill.isCancelled = true;
        await bill.save();
    
        // Add the bill amount to the patient's wallet
        const wallet = await Wallet.findOne({ patientId: bill.patientId });
        
        if (!wallet) {
          throw new Error("Patient wallet not found");
        }
    
        wallet.walletAmount = Math.floor( wallet.walletAmount + bill.billAmount);
        await wallet.save();
    
        res.status(200).send({ message: "Bill cancelled successfully" });
      } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
      }
    }

  }



module.exports = new patientBillingController()