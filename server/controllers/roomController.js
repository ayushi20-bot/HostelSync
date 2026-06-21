const Room = require("../models/Room");

const addRoom = async (req, res) => {
  try {

    const { roomNumber, capacity } = req.body;

    const roomExists = await Room.findOne({
      roomNumber
    });

    if (roomExists) {
      return res.status(400).json({
        message: "Room already exists"
      });
    }

    const room = await Room.create({
      roomNumber,
      capacity
    });

    res.status(201).json(room);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getRooms = async (req, res) => {
  try {

    const rooms = await Room.find();

    res.status(200).json(rooms);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addRoom,
  getRooms
};