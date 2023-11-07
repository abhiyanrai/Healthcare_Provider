const Room = require("../../model/Room")
const roomService = require("../../services/room.service");
const message = require("../../messages/messages");
const Provider = require("../../model/Provider")
const Rooms = require("../../model/Room")
const BadRequestError = require("../../errors/BadRequestError");
const UserValidator = require("../../validators/user.validator");
const _ = require("lodash");

class roomController {
    async create(req, res) {
      const { id: createdBy, role } = req.user;
      // console.log(createdBy, req.user, "usererr");
      if(!(role == "Acount owner")) throw new BadRequestError(message.room.accountOwner);
        const room = await roomService.create({...req.body, createdBy});
        res.status(201).send({ message: message.room.created, room });
    }

    async all(req, res) {
      const { id: createdBy, role } = req.user;
      // console.log(createdBy, "all");
      if(role === "Health care provider") {
        const provider = await Provider.findOne({userId: createdBy})
        const allRooms = await Rooms.find({createdBy: provider.createdBy, isActive: true})
      res.status(200).send({message: "Account owner all Rooms get successfully!", allRooms})
      } else {
      const allRooms = await roomService.all({ isActive: true, createdBy });
      res.status(200).send({ message: message.room.all, allRooms });
      }
  }

    async update(req, res) {
      const update = _.pick(req.body, _.without(_.keys(req.body), "id"));
      // console.log(update, "updateeeee")
      const room = await roomService.update(req.body.id, update);
      res.status(200).send({ message: message.room.update, room });
    }

    async delete (req, res) {
      const filter = {
        isActive: false,
      }
     const room = await roomService.delete(req.body.id, filter);
     res.status(200).send({message: message.room.delete, room})
    }

    async byId(req, res) {
      const { id } = UserValidator.validateObjectId(req.query.id);
      const room = await Room.findOne({ _id: id });
      res.status(200).send({ message: message.room.byId, room });
    }
}

module.exports = new roomController();