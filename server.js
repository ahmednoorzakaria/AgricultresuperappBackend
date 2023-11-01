const express = require("express");
const bodyParser = require("body-parser")
const app = express()

//local imports
const connectDb = require("./Db.js")
const loginRoutes = require("./Routes/login.js")
const registerRoutes = require("./Routes/signup.js")
const createPostRoutes = require("./Routes/createPost.js")
const getAllPostRoutes = require("./Routes/getAllPosts.js")
const getUserPostRoutes = require("./Routes/getUserPosts.js")

const PORT = 6000;

//middleware
app.use(bodyParser.json())
app.use("/api/users",loginRoutes , registerRoutes,createPostRoutes,getAllPostRoutes,getUserPostRoutes);


connectDb()
.then(()=>{
    console.log("databse connected")
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

})
.catch((err)=>{console.log(err)})