const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const Likes = mongoose.model("Likes", LikeSchema);

module.exports = Likes;
