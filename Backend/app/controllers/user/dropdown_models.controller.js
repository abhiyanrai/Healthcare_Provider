const dropdownService = require("../../services/dropdown_model.service");
const message = require("../../messages/messages");
const Provider = require("../../model/Provider")

class dropdownModelController {

    async create (req, res) {
        const dropdownModel = await dropdownService.create({...req.body})
        res.status(201).send({ message: message.dropdownModel.create, dropdownModel });
    }

    async all(req, res) {
        const { id: createdBy, role } = req.user;
      if(role == "Health care provider") {
        const provider = await Provider.findOne({ userId: createdBy });
        const allDropDownModel = await dropdownService.all({createdBy: provider.createdBy, isDeleted: false})
        res.status(200).send({ message: message.dropdownModel.all, allDropDownModel });
      } else {
        const allDropDownModel = await dropdownService.all({ isDeleted: false });
        res.status(200).send({ message: message.dropdownModel.all, allDropDownModel });
      }
    }

}

module.exports = new dropdownModelController()