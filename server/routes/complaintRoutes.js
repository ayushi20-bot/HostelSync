const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");

router.post("/", protect, createComplaint);

router.get("/my", protect, getMyComplaints);

router.get("/", protect, adminOnly, getAllComplaints);

router.put("/:id", protect, adminOnly, updateComplaintStatus);

module.exports = router;