const mongoose = require('mongoose')

const UserSchema =  mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  UserName: String,
});

const UserData = mongoose.model("UserData", UserSchema);

module.exports = UserData;