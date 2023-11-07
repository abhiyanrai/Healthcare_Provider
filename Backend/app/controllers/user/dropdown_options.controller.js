const dropdownOptionService = require("../../services/dropdown_options.service");
const message = require("../../messages/messages");
const _ = require("lodash");
const Provider = require("../../model/Provider")
const BadRequestError = require("../../errors/BadRequestError");
const UserValidator = require("../../validators/user.validator");
const dropdownOptionSchema = require("../../model/dropdown_options")

class dropdownOptionsController {

    async create (req, res) {
        const { id: createdBy } = req.user;
        const { modelId, name } = req.body; 
        const dropdownOptions = await dropdownOptionService.create(modelId, name, createdBy)
        res.status(201).send({ message: message.dropdownOptions.create, dropdownOptions })
    }

    async all(req, res) {
        const { id: createdBy, role } = req.user;
        const { id } = UserValidator.validateObjectId(req.query.id);
        if(role == "Health care provider") {
            const provider = await Provider.findOne({ userId: createdBy });
            const allOptions = await dropdownOptionSchema.find({ modelId: id, createdBy: provider.createdBy, isDeleted: false})
            res.status(200).send({ message: message.dropdownOptions.all, allOptions });
        } else {
            const allOptions = await dropdownOptionSchema.find({modelId: id, createdBy: createdBy, isDeleted: false});
            // console.log(allOptions, "AllOptions")
            res.status(200).send({ message: message.dropdownOptions.all, allOptions });
        }

    }

    async update(req, res) {
        const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
        const dropdownOption = await dropdownOptionService.update(req.body.id, update);
        res.status(200).send({ message: message.dropdownOptions.update, dropdownOption });
    }

   async delete(req, res) {
    const filter = { isDeleted: true }
     const dropdownoption = await dropdownOptionService.delete(req.body.id, filter);
    //  console.log(dropdownoption, "{}{")
     res.status(200).send({message: message.dropdownOptions.delete, dropdownoption})
   }

}

module.exports = new dropdownOptionsController()