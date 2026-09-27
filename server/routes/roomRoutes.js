const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addRoom,
  getRooms,
  allocateRoom,
  getStudents
} = require("../controllers/roomController");

router.post("/", protect, addRoom);

router.get("/", protect, getRooms);

router.put("/allocate", protect, allocateRoom);

router.get("/students", protect, getStudents);

module.exports = router;