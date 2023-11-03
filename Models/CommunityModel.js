const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
  community_name: String,
  description: String,
  community_image: Buffer,
});

const Community = mongoose.model("AgricultureCommunities", CommunitySchema);

module.exports = Community;
