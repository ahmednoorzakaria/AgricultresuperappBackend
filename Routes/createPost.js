const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/Schemas')

router.post('/posts', async (req, res) => {
    try {
      // Extract post data from the request body
      const { user_id, post_content, post_image } = req.body;
  
      // Create a new Post document
      const newPost = new Post({
        user_id,
        post_content,
        post_image,
        timestamp: new Date(),
        likes_count: 0,
        comments_count: 0,
      });
  
      // Save the new post to the database
      await newPost.save();
  
      return res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });