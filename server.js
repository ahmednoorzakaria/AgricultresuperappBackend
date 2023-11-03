const express = require("express");
const app = express();
const connectDb = require("./Db.js");
const cors = require("cors"); 

const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors()
);

// Routes
const loginRoutes = require("./Routes/login.js");
const registerRoutes = require("./Routes/signup.js");
const createPostRoutes = require("./Routes/createPost.js");
const getAllPostRoutes = require("./Routes/getAllPosts.js");
const getUserPostRoutes = require("./Routes/getUserPosts.js");

app.use("/api/users", loginRoutes, registerRoutes, createPostRoutes, getAllPostRoutes, getUserPostRoutes);

app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the Agriculture API",
  });
});

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
