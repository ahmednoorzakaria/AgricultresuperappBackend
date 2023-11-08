const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({ 
    user_id:String, 
    post_heading:String,
    post_content: String,
    post_image: String, 
    timestamp: Date,
    likes_count: Number, 
    comments_count: Number,
    comments:Array,
  });

  const PostData = mongoose.model('Post',PostSchema)
  module.exports = PostData

  