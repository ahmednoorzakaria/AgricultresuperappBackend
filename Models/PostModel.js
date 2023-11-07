const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, 
    post_heading:String,
    post_content: String,
    post_image: String, 
    timestamp: Date,
    likes_count: Number, 
    comments_count: Number,
  });

  const PostData = mongoose.model('Post',PostSchema)
  module.exports = PostData

  