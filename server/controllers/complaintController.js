const Complaint = require("../models/Complaint");
const User = require("../models/User");

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
      .populate("student", "name email")
      .populate("room", "roomNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);

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