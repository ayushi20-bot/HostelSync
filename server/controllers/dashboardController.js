const User = require("../models/User");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");

const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student"
    });

    const totalRooms = await Room.countDocuments();

    const occupiedRooms = await Room.countDocuments({
      occupiedBeds: { $gt: 0 }
    });

    const vacantRooms = totalRooms - occupiedRooms;

    const pendingComplaints = await Complaint.countDocuments({
      status: "pending"
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: "resolved"
    });

    res.status(200).json({
      totalStudents,
      totalRooms,
      occupiedRooms,
      vacantRooms,
      pendingComplaints,
      resolvedComplaints
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getStats };