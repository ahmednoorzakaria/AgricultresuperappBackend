const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/Schemas')
const Comment = require('../Models/Schemas')

router.post('/posts/:postId/comment', async (req, res) => {
    try {
      // Extract comment data from the request body
      
      const { user_id, post_id, comment_content } = req.body;
    
  
      // Create a new Comment document
      const newComment = new Comment({
        user_id,
        post_id,
        comment_content,
        timestamp: new Date(),
      });
  
      // Save the new comment to the database
      await newComment.save();
  
      // Increment the comments_count in the corresponding Post
      await Post.findByIdAndUpdate(post_id, { $inc: { comments_count: 1 } });
  
      return res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });