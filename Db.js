const mongoose = require("mongoose")
require('dotenv').config();

const dbUrl = "mongodb://ndabasteve1:dogimoto@ac-77njrri-shard-00-00.4jc1vgd.mongodb.net:27017,ac-77njrri-shard-00-01.4jc1vgd.mongodb.net:27017,ac-77njrri-shard-00-02.4jc1vgd.mongodb.net:27017/?ssl=true&replicaSet=atlas-mcvpmh-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports = ()=>{
    return mongoose.connect(dbUrl,{ useNewUrlParser: true , useUnifiedTopology:true})
}