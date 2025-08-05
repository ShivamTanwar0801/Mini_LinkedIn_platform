const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ PUBLIC: Anyone can view a user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// ✅ PROTECTED: Only logged-in user can edit their own bio
router.patch("/:id", authMiddleware, async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { bio } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { bio },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update bio" });
  }
});

module.exports = router;
