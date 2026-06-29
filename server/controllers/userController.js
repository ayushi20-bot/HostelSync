const User = require("../models/User");

const getMyRoom = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("room");

    if (!user.room) {
      return res.status(404).json({
        message: "No room assigned",
      });
    }

    res.status(200).json({
      studentName: user.name,
      room: user.room,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyRoom,
  getProfile,
};