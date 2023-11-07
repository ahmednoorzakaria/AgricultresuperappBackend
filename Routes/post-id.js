const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/PostModel');
const { ObjectId } = require('mongoose');
router.get('/posts/:postId', async (req, res) => {
  try {
    // Extract the postId from the URL parameter
    const postId = req.params.postId;
    const Id = new ObjectId(postId);

    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    // Find the specific post by its ID and select only the 'title' and 'image' fields
    const post = await Post.findById(Id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the post
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
