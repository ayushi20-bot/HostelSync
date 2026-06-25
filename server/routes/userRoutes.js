const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getMyRoom } = require("../controllers/userController");

router.get("/my-room", protect, getMyRoom);

module.exports = router;