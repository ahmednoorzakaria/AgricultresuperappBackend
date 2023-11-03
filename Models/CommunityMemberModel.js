const mongoose = require('mongoose');

const CommunityMemberSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  community_id: { type: mongoose.Schema.Types.ObjectId, ref: "AgricultureCommunities" },
});

const CommunityMembers = mongoose.model("CommunityMembers", CommunityMemberSchema);

module.exports = CommunityMembers;
