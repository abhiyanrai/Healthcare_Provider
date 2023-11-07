const authValidator = require("../../validators/auth.validator");
const userService = require("../../services/user.service");
const emailService = require("../../services/email.service");
const User = require("../../model/User")
const Provider = require("../../model/Provider")
const message = require("../../messages/messages")
const BadRequestError = require("../../errors/BadRequestError")
// const dropdownModelService = require("../../services/dropdown_model.service");
// const dropdownOptionService = require("../../services/dropdown_options.service");
  
class UserAuthController {

  async registerAccountOwner(req, res) {
    const user = authValidator.validateRegisterAccountOwner(req.body);  
    console.log(user, 'userrrr')
    const { token, userSubscription, customer } = await userService.createAccountOwner({ email: user.email }, user);
    res.status(201).send({ message: "User registered successfully", token, userSubscription, customer })
  }

  async loginAccountOwner(req, res) {
    let currUser = authValidator.validateLogin(req.body);
    const existedUser = await User.findOne({ email: currUser.email, isActive: true });
    if (!existedUser) throw new BadRequestError(message.user.notExisted);
    if (existedUser.role == "Acount owner") {
      if(!existedUser.clinicId) {
        const lastAccountOwner = await User.findOne(
          { role: "Acount owner" },
          { clinicId: 1 }
        ).sort({ clinicId: -1 });
        const nextClinicId = (lastAccountOwner?.clinicId || 99) + 1;
        existedUser.clinicId = nextClinicId;
        existedUser.save()
      }
      const token = await userService.verifyAdminOrOwnerOrProvider(currUser, existedUser);
      res.status(200).send({ message: "User login successfully", token });
    } else {
      throw new BadRequestError(message.user.ownerRole);
    }
  }

  //  //Owner login with otp & create currently stop!  {
  //   async register(req, res) {
  //     // validation
  //     const user = authValidator.validateUserRegister(req.body);
  //     // create user
  //     const {userAndOtp, userSubscription,customer} = await userService.findAndCreateOwner({ email: user.email }, user);
  //     const { user: owner, otp } = userAndOtp;
  //     emailService.otp(otp, user.email);
  //     // response
  //     res.status(201).send({ message: "User registered successfully", owner, otp, userSubscription, customer });
  //   }

  // async sendOtp(req, res) {
  //   // validation
  //   const { email } = authValidator.validateEmail(req.body.email);
  //   // send otp
  //   const { user: masher, otp } = await userService.findAndSendOtp({ email });
  //   emailService.otp(otp, email);

  //   // response
  //   res.status(200).send({ message: "Otp sent successfully", otp });
  // }

  // async verifyOtp(req, res) {
  //   // validation
  //   const { email, otp } = authValidator.validateEmailAndOtp(req.body);
  //   // verify otp
  //   const token = await userService.findAndVerifyOtp(email, otp);
  //   // response
  //   res.status(200).send({ message: "Verified successfully", token });
  // }

  // }
  async registerProvider(req, res) {
    let { id } = req.user;
    let user = authValidator.validateProviderRegister(req.body);
    let { user: puser, provider } = await userService.createProvider({ email: user.email }, user, id);
    res.status(201).send({ message: "User registered successfully", puser, provider });
  }

  async saveAndSendProvider(req, res) {
    let { id } = req.user;
    const owner = await User.findOne({ _id: id })
    console.log(owner, "owner")
    let user = authValidator.validateProviderRegister(req.body);
    const { password, token } = await userService.findAndCreateProvider({ email: user.email }, user, id);
    emailService.password(password, user, owner);
    res.status(201).send({ message: "User registered successfully", password, token });
  }

  async sendProvider(req, res) {
    let { id } = req.user;
    const owner = await User.findOne({ _id: id })
    let user = authValidator.validateProviderRegister(req.body);
    const password = await userService.sendProvider({ email: user.email });
    emailService.password(password, user, owner);
    res.status(201).send({ message: "User send successfully", password, email: user.email });
  }

  async loginProvider(req, res) {

    let currUser = authValidator.validateLogin(req.body);
    const existedUser = await User.findOne({ email: currUser.email, isActive: true });
    if (!existedUser) throw new BadRequestError(message.user.notExisted);
    if (existedUser.role == "Health care provider") {
      const provider = await Provider.findOne({userId: existedUser._id})
      const owner = await User.findById({_id: provider.createdBy})
      if(owner.clinicId) existedUser.clinicId = owner.clinicId;
      if(owner.invoiceStartingNumber) existedUser.invoiceStartingNumber = owner.invoiceStartingNumber;
      const token = await userService.verifyAdminOrOwnerOrProvider(currUser, existedUser);
      existedUser.save();
      console.log(existedUser)
      res.status(200).send({ message: "User login successfully", token });
    } else {
      throw new BadRequestError(message.user.hcpRole);
    }
  }





}

module.exports = new UserAuthController();