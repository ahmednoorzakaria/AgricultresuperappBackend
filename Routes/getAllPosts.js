const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/PostModel')

router.get('/posts', async (req, res) => {
    try {
      // Find all posts in the database
      const posts = await Post.find();
  
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }})
module.exports = router    