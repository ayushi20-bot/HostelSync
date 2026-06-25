const Room = require("../models/Room");

const User = require("../models/User");

const allocateRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    if (student.room) {
      return res.status(400).json({
        message: "Student already has a room"
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    if (room.occupiedBeds >= room.capacity) {
      return res.status(400).json({
        message: "Room is full"
      });
    }

    student.room = room._id;
    await student.save();

    room.occupiedBeds += 1;
    await room.save();

    return res.status(200).json({
      message: "Room allocated successfully",
      roomNumber: room.roomNumber
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

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
  getRooms,
  allocateRoom
};