const mongoose = require('mongoose')

const UserSchema =  mongoose.Schema({
  Name: String,
  Email: String,
  HashedPassword: String,
  UserName: String,
  profile_img:Buffer,
  Bio:String,

});

const UserData = mongoose.model("UserData", UserSchema);

module.exports = UserData;