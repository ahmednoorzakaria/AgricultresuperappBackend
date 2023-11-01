const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/PostModel')

router.post('/posts', async (req, res) => {
    try {
      // Extract post data from the request body
      const { user_id, post_content, post_heading, post_image, likes_count = 0, comments_count = 0, date = new Date() } = req.body;

      // Create a new Post document
      const post = await Post.create({
        user_id,
        post_content,
        post_heading,
        post_image,
        likes_count,
        comments_count,
        date
      });
  
      return res.status(201).json({
        post_heading: post.post_heading,
        post_content: post.post_content,
        post_image: post.post_image,
        timestamp: post.date,
        likes_count: post.likes_count,
        comments_count: post.comments_count
      })
    
  
  
  
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router