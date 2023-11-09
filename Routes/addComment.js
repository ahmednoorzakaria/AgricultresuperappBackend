const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Post = require('../Models/PostModel');
const UserData = require('../Models/UserModel');


router.put('/addComment/:postId', async (req, res) => {
    try {
        // Extract comment data from the request body
        const postId = req.params.postId; // Correct the variable name to 'postId'
        const { user_id, comment_content } = req.body;
        const user = await UserData.findById(user_id);


        // Create the comment object
        const newComment = {
            user_id: user_id,
            comment_content: comment_content,
            User : user
        };

        // Update the corresponding post to include the new comment
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: newComment }, // Assuming you have a 'comments' field in your Post schema
                $inc: { comments_count: 1 }, // Increment the comments_count
            },
            { new: true } // Return the updated post
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return the new comment as a response
        return res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
