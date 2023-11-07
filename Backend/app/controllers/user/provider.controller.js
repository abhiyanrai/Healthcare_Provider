const Provider = require("../../model/Provider");
const _ = require("lodash");
const User = require("../../model/User")
const BadRequestError = require("../../errors/BadRequestError");
const message = require("../../messages/messages")
const NotFoundError = require("../../errors/NotFoundError");
const providerService = require("../../services/provider.service");
const UserValidator = require("../../validators/user.validator");
const bcrypt = require("bcryptjs");

class ProviderController {

  async byAuth(req, res) {
    const { id: userId } = req.user;
    // console.log(userId, "Iddd")
    const provider = await Provider.findOne({ userId }).populate("userId", "salutation firstName lastName email contactNo profilePic role");
    res.status(200).send({ message: "Provider by auth", provider });
  }

  async byId(req, res) {
    const { id } = UserValidator.validateObjectId(req.query.id);
    const provider = await Provider.findOne({ _id: id }).populate("userId", "salutation firstName lastName email contactNo profilePic");
    res.status(200).send({ message: "Provider by auth", provider });
  }

  async update(req, res) {
    const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
    const provider = await providerService.update(req.body.id, update);
    res.status(200).send({ message: "User update successfully", provider });
  }

  async deleteProvider(req, res) {
    const filter = {
      isActive: false,
    }
    const provider = await providerService.delete(req.body.id, filter);
    res.status(200).send({ message: message.provider.delete, provider })
  }


  async allProvider(req, res) {
    const { id: createdBy } = req.user;
    let { page, limit } = req.query;
    const filter = { isActive: true, createdBy }
    const user = await User.findById(createdBy);  
    // console.log(user, "sier")
    const allCount = await Provider.find(filter).sort({ createdAt: -1 }).populate("userId");
    const filtered = [user, ...allCount]
    // console.log(filtered, "filteredd")
    const allProviders = await providerService.all(filter, page, limit)
    // console.log(allProviders.length, "OOo")
    res.status(200).send({ message: "all Providers", allProviders, totalCount: allCount.length, filtered });
  }

  async changePassword(req, res) {
    // essentials
    const { id } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // validation n

    // change password
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("user does not exist with this id");
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new BadRequestError("old password is not correct");
    user.password = await bcrypt.hash(newPassword, 10);
    user.save();

    // response
    res.status(200).send({ message: "Password change successfully", user });
  }

}

module.exports = new ProviderController();