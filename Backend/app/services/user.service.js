const DataService = require("./data.service");
const User = require("../model/User");
const Provider = require("../model/Provider");
const bcrypt = require("bcryptjs");
const BadRequestError = require("../errors/BadRequestError");
const message = require("../messages/messages");

const stripeService = require("../services/stripe.service");
class UserService extends DataService {

  async createSuperAdmin(filter, adminObj) {
    const existedUser = await User.findOne(filter);
    if (existedUser) throw new BadRequestError(message.user.existed);
    let user = new User(adminObj);
    user.password = await bcrypt.hash(user.password, 10);
    user.role = "Super admin";
    user = await user.save();
    return user.generateAuthToken();
  }

  async createAccountOwner(filter, ownerObj) {
    const existedUser = await User.findOne(filter);
    if (existedUser) throw new BadRequestError(message.user.existed);
    let user = new User(ownerObj);
    user.password = await bcrypt.hash(user.password, 10);
    user.role = "Acount owner";
    if (user.role === "Acount owner") {
      const lastAccountOwner = await User.findOne(
        { role: "Acount owner" },
        { clinicId: 1 }
      ).sort({ clinicId: -1 });
      const nextClinicId = (lastAccountOwner?.clinicId || 99) + 1;
      user.clinicId = nextClinicId;
    }
    user = await user.save();
    await this.createDefaultDropdownOptions(user);
    const { userSubscription, customer } = await stripeService.createCustomer(user);
    const token = await user.generateAuthToken();
    return { token, userSubscription, customer }
  }

  // async findAndCreateOwner(filter, ownerObj) {
  //   const existedUser = await User.findOne(filter);
  //   if (existedUser) throw new BadRequestError(message.user.existed);
  //   let user = new User(ownerObj);
  //   user.role = "Acount owner";
  //   const userAndOtp = await this.generateOtp(user);
  //   const {userSubscription,customer} = await stripeService.createCustomer(userAndOtp.user);
  //   return {userAndOtp, userSubscription, customer}
  // }

  async createProvider(filter, providerObj, createdBy) {
    const existedUser = await User.findOne(filter);
    if (existedUser) throw new BadRequestError(message.user.existed);
    let user = new User(providerObj);
    let provider = new Provider({ ...providerObj, userId: user.id, createdBy });
    provider = await provider.save();
    user = await user.save();
    return { user, provider }
  }

  async findAndCreateProvider(filter, providerObj, createdBy) {
    const existedUser = await User.findOne(filter);
    if (existedUser) throw new BadRequestError(message.user.existed);
    const password = this.generatePassword();
    let user = new User(providerObj);
    let provider = new Provider({ ...providerObj, userId: user.id, createdBy });
    provider = await provider.save();
    user.password = await bcrypt.hash(password, 10);
    user = await user.save();
    const token = user.generateAuthToken();
    return { password, token };
  }

  async sendProvider(filter) {
    const existedUser = await User.findOne(filter);
    if (!existedUser) throw new BadRequestError(message.user.notExisted);
    const password = this.generatePassword();
    // console.log(password,"password");
    existedUser.password = await bcrypt.hash(password, 10);
    await existedUser.save();
    return password
  }

  async verifyAdminOrOwnerOrProvider(currUser, existedUser) {
    // console.log(currUser, existedUser, "UUUu")
    if (!existedUser.password) throw new BadRequestError("Password not created!")
    const valid = await bcrypt.compare(currUser.password, existedUser.password);
    if (!valid) throw new BadRequestError(message.password.invalid);
    return existedUser.generateAuthToken(currUser.acceptCheckbox);
  }

  async findAndSendOtp(filter) {
    let user = (await this.find(User, filter, message.user.notExisted))[0];
    return await this.generateOtp(user);
  }

  async findAndVerifyOtp(email, otp) {
    let user = (await this.find(User, { email }))[0];
    let verify = await bcrypt.compare(otp, user.otp);
    if (!verify) throw new BadRequestError(message.otp.invalid);
    return user.generateAuthToken();
  }

  async update(id, update) {
    return await this.findByIdAndUpdate(User, id, update, message.user.notExisted);
  }




}

module.exports = new UserService();