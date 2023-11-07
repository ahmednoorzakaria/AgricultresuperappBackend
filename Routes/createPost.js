const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();

app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limt:"100mb", extended: true,parameterLimit:50000 }));

app.use(cors());

const PostData = require("../Models/PostModel");
const jwtUtils = require("./jwtUtils"); // Import JWT-related functions and secret key

// Create a new blog post associated with the logged-in user
router.post("/create",async (req, res) => {
  const data = req.body
  try {
    // Extract post data from the request body
  

    // Get the user's ID from the JWT token
    

    // Create a new Post document associated with the logged-in user
    const post = await PostData.create({
      user_id:data.user_id,
      post_heading:data.post_heading,
      post_content: data.post_content,
      post_image: data.post_image,
      timestamp: new Date(),
      likes_count: 0,
      comments_count: 0

    });

    return res.status(201).json({
      user_id:post.user_id,
      post_heading:post.post_heading,
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
