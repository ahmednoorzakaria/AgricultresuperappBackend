const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mutler = require("multer")

const UserData = require("./Models/UserDataModel");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000

const storage = mutler.memoryStorage();
const upload = mutler({storage:storage})
// Handling user login request
app.post("/Signin") ,async (req, res) => {
  const data = req.body; // Get user data from request body
 
  // Validate email pattern using regular expression
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(data.Email)) {
     return res.send({
       message: "INVALID EMAIL ADDRESS",
       proceed: false,
     });
  }
 
  // Validate password pattern using regular expression
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (!passwordPattern.test(data.Password)) {
     return res.send({
       message: "INVALID PASSWORD",
       proceed: false,
     });
  }
 
  // Check if user exists in the database
  try {
     const user = await UserData.findOne({
       Email: data.Email,
     });
 
     if (!user) {
       return res.send({
         message: "USER NOT FOUND",
         proceed: false,
       });
     }
 
     // Compare password hashes to verify the user's password
     const match = await bcrypt.compare(data.Password, user.HashedPassword);
 
     if (!match) {
       return res.send({
         message: "INCORRECT PASSWORD",
         proceed: false,
       });
     }
 
     // Return user data and successful login message
     return res.send({
       data: {
         UserID: user._id.toString(),
         Name: user.Name,
         Email: user.Email,
         UserName: user.UserName,
       },
       message: "USER SIGNED IN SUCCESSFULLY",
       proceed: true,
     });
  } catch (error) {
     return res.send("ERROR SIGNING IN");
  }
 }

//Handling user signup  requests 
  app.post("/SignUp", upload.single("profile_img"), async (req, res) => {
    const data = req.body;
    const bio = data.bio; o

    
    // Email validation regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Password validation regular expression
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
    if (!emailPattern.test(data.Email)) {
      return res.send({
        message: "INVALID EMAIL ADDRESS",
        proceed: false,
      });
    }
  
    if (!passwordPattern.test(data.Password)) {
      return res.send({
        message: "INVALID PASSWORD: Password should be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one special character.",
        proceed: false,
      });
    }
  //Cheking is user email is already in use 
    try {
      const emailInUse = await UserData.findOne({
        Email: data.Email,
      });
  
      if (emailInUse) {
        return res.send({
          message: "EMAIL ALREADY IN USE",
          proceed: false,
        });
      }
  
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
  
      delete data.Password;
      data.HashedPassword = hashedPassword;
      data.profile_img = req.file.buffer; 
      data.Bio = bio; 
  
      const user = await UserData.create(data);
  
      return res.send({
        data: {
          UserID: user._id.toString(),
          Name: user.Name,
          Email: user.Email,
          HashedPassword: user.HashedPassword,
          UserName: user.UserName,
          profile_img: user.profile_img,
          Bio: user.Bio,
        },
        message: "USER CREATED SUCCESSFULLY",
        proceed: true,
      });
    } catch (error) {
      console.error(error);
      return res.send("ERROR CREATING ACCOUNT");
    }
  });
  
  
  const start = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://ndabasteve1:dogimoto@test.4jc1vgd.mongodb.net/?retryWrites=true&w=majority" );
      app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  };


  
  start();