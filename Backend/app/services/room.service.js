const DataService = require("./data.service");
const Room = require("../model/Room")

class roomService extends DataService {
    async create(roomObj) {
        const room = new Room(roomObj);
        // console.log(room, "roommmm")
        return await room.save();
      }

      async all(filter) {
        // console.log(filter, "fitlererreerer")
        return await Room.find(filter).sort({ createdAt: -1 });
      }

      async update(id, update) {
        return await this.findByIdAndUpdate(Room, id, update);
      }

      async delete(id, filter) {
        // console.log(filter)
        return await Room.findByIdAndUpdate(id, filter)
      }

  }
  
  module.exports = new roomService();