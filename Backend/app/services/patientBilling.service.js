const DataService = require("./data.service");
const billingModel = require("../model/patientBilling")
const Wallet = require("../model/patientWallet");
const BadRequestError = require("../errors/BadRequestError");
const messages = require("../messages/messages");
const WalletTransaction = require("../model/WalletTransaction");
const User = require("../model/User");
const Patient = require("../model/Patient")
const Provider = require("../model/Provider")
const NotFoundError = require("../errors/NotFoundError");
const Service = require("../model/Services")

class patientBillingService extends DataService {

    async create(billingObject, createdBy, role) {
      let user, updatedWalletAmount;
      if(role === "Health care provider") {
         const provider = await Provider.findOne({userId: createdBy})
         user = await User.findById(provider.createdBy)
      } else {
         user = await User.findById(createdBy);
      }  
      if(!user.clinicId) {
        throw new NotFoundError(messages.user.clinicId)
      } else if(!user.invoiceStartingNumber) {
        throw new NotFoundError(messages.user.invoiceStartingNumber)
      }
      const findPatient = await Patient.findById({ _id: billingObject.patientId })

      if(!findPatient) throw new BadRequestError("Patient not found")

         let findWallet = await Wallet.findOne({ isDeleted: false, patientId: findPatient._id})
        
         if(!findWallet) {
          findWallet = await Wallet.create({
            patientId: findPatient._id  
          })
         }
         
         if(billingObject.paidAmount) {
          updatedWalletAmount = (findWallet.walletAmount + billingObject.paidAmount) - billingObject.billAmount 
         } else {
          updatedWalletAmount = findWallet.walletAmount - billingObject.billAmount
         }
        
        console.log(updatedWalletAmount,  "updatedWalletAmount")
        let status = "paid";  
           if (updatedWalletAmount > 0) {
             status = "advancedPaid";
          } else if (updatedWalletAmount < 0) {
             status = "unpaid";
         }
       const existingBillings = await billingModel.find({ createdBy: user._id })
       .sort({ invoiceNumber: -1 })
       .limit(1);

         let nextInvoiceNumber;
          if (typeof existingBillings[0]?.invoiceNumber === 'undefined') {
              nextInvoiceNumber = `${user.clinicId}_${user.invoiceStartingNumber}`;
          } else {
             const highestInvoiceNumber = existingBillings[0].invoiceNumber;
             const lastInvoiceNumberPart = parseInt(highestInvoiceNumber.split('_')[1]);
            nextInvoiceNumber = `${user.clinicId}_${lastInvoiceNumberPart + 1}`;
          
       }
       const populatedOrderJson = await Promise.all(billingObject.orderJson.map(async (order) => {
        const service = await Service.findById(order.serviceId);
        return {
            ...service
        };
    }));
    
        const patientBilling = await billingModel.create({
              createdBy: user._id,
              patientId: findPatient._id,
              totalAmount: billingObject.totalAmount,
              discountApplied: billingObject.discountApplied,
              billAmount: billingObject.billAmount,
              serviceDate: billingObject.serviceDate,
              orderJson: populatedOrderJson,
              invoiceNumber: nextInvoiceNumber,
              paidAmount: billingObject.paidAmount !== undefined ? findWallet.walletAmount + billingObject.paidAmount : findWallet.walletAmount,
              walletAmount: updatedWalletAmount
         });
       
        if(patientBilling) {
          const patientTransaction = new WalletTransaction({     
            walletId: findWallet._id,
            billingId: patientBilling._id, 
            paymentMode: billingObject.paymentMode,
            status: status,
          });
          await patientTransaction.save();
          await Wallet.updateOne(
            { _id: findWallet._id },
            { $set: { walletAmount: updatedWalletAmount } }
          );
        }
        return { patientBilling, updatedWalletAmount };
      }


    async update(id, update) {
        return await this.findByIdAndUpdate(billingModel, id, update);
    }

    async delete(id, filter) {
      return await billingModel.findByIdAndUpdate(id, filter)
    }


    async all (filter) {
      return await billingModel.find(filter).sort({createdAt: -1})
    }

  }
  
  module.exports = new patientBillingService();