const User = require("../models/User.js");

const getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    }

    res.status(200).json({ status: "success", user });

  } catch (error) {
    console.error("Profile get error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body.updates;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated",
      user: updatedUser
    });

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProfileById, updateProfile };
