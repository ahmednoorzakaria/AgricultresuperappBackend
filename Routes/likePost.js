const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/Schemas')

router.put('/posts/:postId/like', async (req, res) => {
    try {
      // Get the post ID from the request parameters
      const postId = req.params.postId;
  
      // Find the post by ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Increment the likes_count by 1
      post.likes_count += 1;
  
      // Save the updated post to the database
      await post.save();
  
      return res.status(200).json({ message: 'Like added', likes_count: post.likes_count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });