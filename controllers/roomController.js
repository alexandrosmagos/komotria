const Rooms = require("../models/roomModel");
const {ObjectId} = require('mongodb');

module.exports = class Room {

	static async getRooms(req, res, next) {
		try {
			const rooms = await Rooms.find({}).sort({createdAt: -1});
			if (!rooms){
				return JSON.stringify({message: "No rooms found"});
			}
			return rooms;
		} catch (err) {
			return JSON.stringify(err);
		}
	}

	static async getRoom(req, res, next) {
		try {
			const room = await Rooms.findById(req);
			if (!room){
				return JSON.stringify({message: "No room found"});
			}
			console.log("rOOM: "+room);
			return room;
		} catch (err) {
			console.log(err);
			return JSON.stringify(err);
		}
	}

	// static async getRoomMessages(req, res, next) {
	// 	try {
	// 		const messages = await RoomService.getRoomMessages(req.params.id);
	// 		res.status(200).json(messages);
	// 	} catch (err) {
	// 		res.status(500).json(err);
	// 	}
	// }

	static async createRoom(req, res, next) {
		//Create new room
		try {
			const room = await new Rooms({
				type: req.body.type,
				title: req.body.title,
				description: req.body.description,
				createdBy: ObjectId(req.body.createdBy),
			}).save();
			return res.status(200).send(room);
		} catch (err) {
			return JSON.stringify(err);
		}
	}

	static async deleteRoom(req, res, next) {
		try {
			const room = await Rooms.findByIdAndDelete(req.params.id);
			return res.status(200).send(room);
		} catch (err) {
			return JSON.stringify(err);
		}
	}

};