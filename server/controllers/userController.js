const User = require("../models/User");

const getMyRoom = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("room");

    if (!user.room) {
      return res.status(404).json({
        message: "No room assigned"
      });
    }

    res.status(200).json({
      studentName: user.name,
      room: user.room
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getMyRoom };