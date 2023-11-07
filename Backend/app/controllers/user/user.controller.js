const User = require("../../model/User");
const _ = require("lodash");
const BadRequestError = require("../../errors/BadRequestError");
const authValidator = require("../../validators/auth.validator");
const NotFoundError = require("../../errors/NotFoundError");
const userService = require("../../services/user.service");
const bcrypt = require("bcryptjs");
const emailService = require("../../services/email.service");
const Patients = require("../../model/Patient")
const Transaction = require("../../model/Transaction");
const Providers = require("../../model/Provider")
const Clinic = require("../../model/ClinicDetails")
const Bank = require("../../model/BankDetails")
const Billing = require("../../model/patientBilling")
const UnAuthorizedError = require("../../errors/UnAuthorizedError")
const messages = require("../../messages/messages");

class userController {


  async transactionHistory(req, res) {
    const { id, role } = req.user;
    // console.log(id)
    if (!(role == 'Acount owner')) throw new BadRequestError("Oops role must be an account owner!")
    const allTransactions = await Transaction.find({ isDeleted: false, userId: id })
    res.status(200).send({ message: "allTransaction get successfull", allTransactions })
  }


  async byAuth(req, res, next) {
    // essentials
    const { id } = req.user;
    // find user
    const user = await User.findById(id);
    if (!user) {
      throw new UnAuthorizedError('User not found')
    }
    // req.user = user;
    // console.log(user, "user")

    // response user
    res.status(200).send({ message: "User by auth", user });
  }

  async update(req, res) {
    // essentials
    const { id } = req.user;
    // validation n
    const update = req.body;

    // user update
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) throw new BadRequestError("user does not exist with this id");

    // response user
    res.status(200).send({ message: "User update successfully", user });
  }

  async updateById(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const user = await userService.update(req.body.id, update);
    res.status(200).send({ message: "User update successfully", user });
  }

  async changePassword(req, res) {
    // essentials
    const { id } = req.user;
    // console.log(id, "iddddd")
    let currUser = authValidator.validateChangePassword(req.body);
    // const { oldPassword, newPassword, confirmPassword } = req.body;
    // validation n
    // change password
    const existedUser = await User.findById(id);
    if (!existedUser) throw new NotFoundError("user does not exist with this id");
    const valid = await bcrypt.compare(currUser.oldPassword, existedUser.password);
    if (!valid) throw new BadRequestError("Incorrect old password");
    existedUser.password = await bcrypt.hash(currUser.newPassword, 10);
    existedUser.save();

    // response
    res.status(200).send({ message: "Password change successfully", existedUser });
  }
  // 642144d0b0d9dd0a9397311a
  async forgotPassword(req, res) {
    const { email } = req.body;
    const password = await userService.sendProvider({ email });
    // console.log(password)
    emailService.resetPassword(password, email);

    // response
    res.status(200).send({ message: "Password is sent to your email id", password });
  }


  async all(req, res) {
    const { id: createdBy } = req.user;
    const billing = await Billing.find({ createdBy })
    const patients = await Patients.find({ createdBy })
    const providers = await Providers.find({ createdBy })
    res.status(200).send({
      totalPatients: patients.length,
      totalProviders: providers.length, totalBilling: billing.length
    })
  }


  async setInvoiceNumber(req, res) {
    try {
      const { id: userId } = req.user; 

      const { invoiceNumber } = req.body;
  
      if (!userId || !invoiceNumber) {
        return res.status(400).send({ message: messages.invoiceNumber.wrongInput });
      }
  
      const user = await User.findById({_id: userId});
    
      if (!user) {
        return res.status(404).send({ message: messages.invoiceNumber.notFound });
      }
  
      if (user.role !== 'Acount owner') {
        return res.status(403).send({ message: messages.invoiceNumber.restrict});
      }
    
      const parsedInvoiceNumber = parseInt(invoiceNumber);
    
      if (isNaN(parsedInvoiceNumber)) {
        return res.status(400).send({ message: messages.invoiceNumber.wrongFormat });
      }
  
      if (parsedInvoiceNumber >= 1000000) {
        return res.status(400).send({ messages: messages.invoiceNumber.exceeds});
      }
  
      const formattedInvoiceNumber = String(parsedInvoiceNumber).padEnd(6, '0');
      user.invoiceStartingNumber = parseInt(formattedInvoiceNumber);
      await user.save();

      res.status(200).send({ messages: messages.invoiceNumber.sucess, invoiceStartingNumber: user.invoiceStartingNumber });
    } catch (error) {
      res.status(500).send({ messages: 'Something went wrong' });
    }
  }


  async createAndUpdateClinicProfile(req, res) {

    const { id: createdBy } = req.user, { id: userId} = req.body;
  
    try {
      let clinic;
      const existedClinic = await Clinic.findOne({_id: userId})
      if(existedClinic) {
        const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
        clinic = await Clinic.findByIdAndUpdate(existedClinic._id, update, { new: true });
        res.status(201).send({ message: messages.clinicDetails.update, clinic}); 
      } else {
         clinic = new Clinic({...req.body, createdBy });
        await clinic.save();
        res.status(201).send({ message: messages.clinicDetails.create, clinic});
      }
  
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }

  }


  async getClinicDetailsById(req, res) {

      const { id: createdBy } = req.user;

      try {
          const clinic = await Clinic.findOne({ userId: createdBy });
          if(!clinic) {
            return res.status(201).send({ message: messages.clinicDetails.notFound, clinic: {}})
          }
          res.status(200).send({ message: messages.clinicDetails.getById, clinic})
      } catch (error) {
          res.status(500).send({ message: "Something went wrong" });
      }

  }



  async createAndUpdateBankDetails(req, res) {
   
    const { id: createdBy } = req.user, { id: userId, clinicId} = req.body;
  
    try {
      let bank;
      const existedBank = await Bank.findOne({_id: userId})
      if(existedBank) {
        const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
        bank = await Bank.findByIdAndUpdate(existedBank._id, update, { new: true });
        res.status(201).send({ message: messages.bankDetails.update, bank }); 
      } else {
        bank = new Bank({...req.body, createdBy });
        await bank.save();
        res.status(201).send({ message: messages.bankDetails.create, bank});
      }
  
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }

  }


  async getBankDetailsById(req, res) {

    const { id: createdBy } = req.user;

    try {
        const bank = await Bank.findOne({ userId: createdBy });
        if(!bank) {
          return res.status(201).send({ message: messages.bankDetails.notFound, clinic: {}})
        }
        res.status(200).send({ message: messages.bankDetails.getById, bank})
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }

}


  
}

module.exports = new userController();