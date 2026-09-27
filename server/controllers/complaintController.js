const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Room = require("../models/Room");

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = await User.findById(req.user.id);

    const complaint = await Complaint.create({
      title,
      description,
      student: user._id,
      room: user.room
    });

    res.status(201).json(complaint);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id
    })
    .populate("room", "roomNumber")
    .sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email room")
      .populate("room", "roomNumber")
      .sort({ createdAt: -1 });

    const updatedComplaints = await Promise.all(
      complaints.map(async (complaint) => {

        if (
          complaint.student &&
          complaint.student.room
        ) {
          const room = await require("../models/Room").findById(
            complaint.student.room
          );

          return {
            ...complaint.toObject(),
            room
          };
        }

        return complaint;
      })
    );

    res.status(200).json(updatedComplaints);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = status;

    await complaint.save();

    res.status(200).json(complaint);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
};