const mongoose = require("mongoose")
require('dotenv').config();

const dbUrl = process.env.MONGODB_URL;

module.exports = ()=>{
    return mongoose.connect(dbUrl,{ useNewUrlParser: true , useUnifiedTopology:true})
}