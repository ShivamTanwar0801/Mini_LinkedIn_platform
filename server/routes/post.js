const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/authMiddleware");

// Create post (🔐 Auth required)
router.post("/", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  try {
    const post = new Post({ userId, text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Get posts by user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
});

module.exports = router;
