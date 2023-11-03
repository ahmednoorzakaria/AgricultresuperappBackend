const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comment_content: String,
  timestamp: Date,
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
