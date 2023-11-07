const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/PostModel')

router.get('/posts/:userId', async (req, res) => {
    try {
      // Get the user ID from the request parameters
      const userId = req.params.userId;
  
      // Find all posts with the given user_id
      const userPosts = await Post.find({ user_id: userId });
  
      return res.status(200).json(userPosts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router  
