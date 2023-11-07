const Service = require("../../model/Services")
const serviceService = require("../../services/service.service")
const message = require("../../messages/messages");
const BadRequestError = require("../../errors/BadRequestError");
const _ = require("lodash");
const Provider = require("../../model/Provider")
const Services = require("../../model/Services")
const UserValidator = require("../../validators/user.validator");
const ServiceCategory = require("../../model/serviceCategory");
const NotFoundError = require("../../errors/NotFoundError");

class serviceController {

    async create(req, res) {
      const { id: createdBy, role } = req.user; 
      const { serviceName, serviceDescp, amount, subService, categoryId } = req.body
      if(!(role == "Acount owner")) throw new BadRequestError(message.service.accountOwner);
      if(categoryId) {
        const findCategory = await ServiceCategory.findById(categoryId)
        if(!findCategory) throw new NotFoundError(message.service.notFound)
        const service = await serviceService.create(serviceName, serviceDescp, amount, subService, createdBy, categoryId)
       return res.status(201).send({ message: message.service.registered, service});
      } else {
          throw new BadRequestError(message.service.categoryId)
      }
    }

    async all(req, res) {
      const { id: createdBy, role } = req.user;
      const filter = { isActive: true, createdBy }
      if(role === "Health care provider") {
        const provider = await Provider.findOne({userId: createdBy})
        const allServices = await Services.find({createdBy: provider.createdBy, isActive: true})
      res.status(200).send({message: "Account owner all Services get successfully!", allServices})
      } else {
      const allServices = await serviceService.all(filter)
      // console.log(allServices, "Servicessss")
      res.status(200).send({ message: message.service.all, allServices });
      } 
  }


    async update(req, res) {
      const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
      // console.log(update, "Updateeeeeee")  
      const service = await serviceService.update(req.body.id, update);
      console.log(service, "datataaaaa")
      res.status(200).send({ message: message.service.update, service });
    }

    async delete(req, res) {
      const filter = { isActive: false }
      const service = await serviceService.delete(req.body.id, filter)
      res.status(200).send({ message: message.service.delete, service })
    }

    async getById(req, res) {
      const { id } = UserValidator.validateObjectId(req.query.id)
      let service = await Service.findOne({_id: id}).populate("subService")
      if(!service) {
        throw new NotFoundError("Service not found")
      } 
     res.status(200).send({ message: message.service.getById, service })
    }

}


module.exports = new serviceController()