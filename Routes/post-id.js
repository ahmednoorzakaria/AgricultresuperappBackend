const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));

app.use(cors());

const PostData = require('../Models/PostModel');

router.get('/individualPosts/:Id', async (req, res) => {
    try {
        // Extract the postId from the URL parameter
        const postId = req.params.Id;

        // Find the specific post by its ID
        const post = await PostData.findOne({_id:postId});

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Send the post data as a response
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
