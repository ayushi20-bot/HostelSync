const adminOnly = (req, res, next) => {
  console.log("req.user =", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();
};

module.exports = adminOnly;