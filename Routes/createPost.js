const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const Post = require("../Models/PostModel");
const jwtUtils = require("./jwtUtils"); // Import JWT-related functions and secret key

// Create a new blog post associated with the logged-in user
router.post("/create", jwtUtils.verifyJwtToken,async (req, res) => {
  try {
    // Extract post data from the request body
    const {
      post_content,
      post_heading,
      post_image,
      likes_count = 0,
      comments_count = 0,
    } = req.body;

    // Get the user's ID from the JWT token
    const token = req.headers["authorization"];
    const decodedToken = jwtUtils.verifyJwtToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user_id = decodedToken.id; // Assuming the user ID is stored in the JWT

    // Create a new Post document associated with the logged-in user
    const post = await Post.create({
      user_id,
      post_content,
      post_heading,
      post_image,
      likes_count,
      comments_count,
      date: new Date(),
    });

    return res.status(201).json({
      post_heading: post.post_heading,
      post_content: post.post_content,
      post_image: post.post_image,
      timestamp: post.date,
      likes_count: post.likes_count,
      comments_count: post.comments_count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
