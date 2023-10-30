const mongoose = require('mongoose');

// Defining the schema for the Users Table
const UserSchema = mongoose.Schema({ 
  name: String,
  email: String,
  hashedPassword: String,
  userName: String,
  profile_img: Buffer,
  bio: String,
});

// Defining the schema for the Agricultural Blogs/Posts Table
const PostSchema = new mongoose.Schema({ 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, 
  post_content: String,
  post_image: Buffer, 
  timestamp: Date,
  likes_count: Number, 
  comments_count: Number,
});

// Define the schema for the Agricultural Communities/Groups Table
const CommunitySchema = new mongoose.Schema({ // Correct the schema variable name
  community_name: String,
  description: String,
  community_image: Buffer,
});

// Defining the schema for the Community Members Table
const CommunityMemberSchema = new mongoose.Schema({ 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, // Reference the User model
  community_id: { type: mongoose.Schema.Types.ObjectId, ref: "AgricultureCommunities" }, // Reference the Community model
});

// Defining the schema for the Following Table
const FollowingSchema = new mongoose.Schema({ 
  follower_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, // Reference the User model
  followee_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "followeeModel",
  },
  followeeModel: {
    type: String,
    enum: ["UserData", "AgricultureCommunities"], 
  },
});

// Define the schema for the Comments Table
const CommentSchema = new mongoose.Schema({ 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, // Reference the User model
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference the Post model
  comment_content: String,
  timestamp: Date,
});

// Define the schema for the Likes Table
const LikeSchema = new mongoose.Schema({ 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" }, // Reference the User model
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference the Post model
});

// Creating the models
const User = mongoose.model("UserData", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Community = mongoose.model("AgricultureCommunities", CommunitySchema);
const CommunityMembers = mongoose.model("CommunityMembers", CommunityMemberSchema);
const Following = mongoose.model("Following", FollowingSchema);
const Comments = mongoose.model("Comments", CommentSchema);
const Likes = mongoose.model("Likes", LikeSchema);

// Export the models
module.exports = {
  User,
  Post,
  Community,
  CommunityMembers,
  Following,
  Comments,
  Likes,
};
