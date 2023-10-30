const mongoose = require("mongoose")

const dbUrl = "mongodb+srv://ndabasteve1:dogimoto@test.4jc1vgd.mongodb.net/?retryWrites=true&w=majority"

module.exports = ()=>{
    return mongoose.connect(dbUrl,{ useNewUrlParser: true , useUnifiedTopology:true})
}