
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const serviceCategory = require("../../services/serviceCategory")
const serviceCategoryModel = require("../../model/serviceCategory")
const _ = require("lodash");
const UserValidator = require("../../validators/user.validator");

class serviceCategoryController {

    async create (req, res) {
      const { id: createdBy, role } = req.user;
      // console.log(createdBy, req.user, "usererr");
      if(!(role == "Acount owner")) throw new BadRequestError(message.room.accountOwner);
        const service = await serviceCategory.create({...req.body, createdBy});
        return res.status(201).send({ message: message.serviceCategory.registered, service});
    }


    async all(req, res) {
      const { id: createdBy } = req.user;
      // console.log(createdBy, req.user, "all");
      const allCategory = await serviceCategory.all({ isDeleted: false, createdBy });
      res.status(200).send({ message: message.serviceCategory.all, allCategory });
    }
  

    async update(req, res) {
      const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
      // console.log(update, "updateeeee")
      const category = await serviceCategory.update(req.body.id, update);
      res.status(200).send({ message: message.serviceCategory.update, category });
    }


    async delete (req, res) {
      const filter = {
        isDeleted: true,
      }
     const category = await serviceCategory.delete(req.body.id, filter);
     res.status(200).send({message: message.serviceCategory.delete, category})
    }

    async byId(req, res) {
      const { id } = UserValidator.validateObjectId(req.query.id);
      const category = await serviceCategoryModel.findOne({ _id: id });
      res.status(200).send({ message: message.serviceCategory.byId, category });
    }

}

module.exports = new serviceCategoryController()