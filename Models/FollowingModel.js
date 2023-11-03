const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({
  follower_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  followee_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "followeeModel",
  },
  followeeModel: {
    type: String,
    enum: ["UserData", "AgricultureCommunities"],
  },
});

const Following = mongoose.model("Following", FollowingSchema);

module.exports = Following;
