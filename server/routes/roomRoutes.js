const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addRoom,
  getRooms
} = require("../controllers/roomController");

router.post("/", protect, addRoom);

router.get("/", protect, getRooms);

module.exports = router;