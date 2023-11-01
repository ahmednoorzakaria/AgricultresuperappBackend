const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({ 
    name: String,
    email: String,
    hashedPassword: String,
    userName: String,
    profile_img: Buffer,
    bio: String,
  });

  const UserData = mongoose.model('UserData',UserSchema)
  module.exports = UserData

   