const express = require("express");
const app = express();
const connectDb = require("./Db.js");
const cors = require("cors"); 

const PORT = 5000;

// Middleware
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ limit:'100mb',extended: true,parameterLimit:50000 }));

app.use(
  cors()
);

// Routes
const loginRoutes = require("./Routes/login.js");
const registerRoutes = require("./Routes/signup.js");
const createPostRoutes = require("./Routes/createPost.js");
const getAllPostRoutes = require("./Routes/getAllPosts.js");
const getUserPostRoutes = require("./Routes/getUserPosts.js");
const getPostById = require("./Routes/post-id.js")

app.use("/api/users", loginRoutes, registerRoutes, createPostRoutes, getAllPostRoutes, getUserPostRoutes,getPostById);

app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the Agriculture API",
  });
});

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server is running On port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
