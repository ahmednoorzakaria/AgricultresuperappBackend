const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const jwtUtils = require("./jwtUtils"); // Import JWT-related functions and secret key

// Local imports
const User = require("../Models/UserModel");

// Login route
router.post("/Signin", async (req, res) => {
  const data = {
    email: req.body.email,
    Password: req.body.Password,
  }; 
  // Validate email pattern using regular expression
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const inputEmail = data.email.toLowerCase(); // Convert email to lowercase
  if (!emailPattern.test(inputEmail)) {
     res.send({
       message: "INVALID EMAIL ADDRESS",
       proceed: false,
     });
     return;
  }
 
  // Check if user exists in the database
  try {
     const user = await User.findOne({
       email: inputEmail, // Use the lowercase email
     });
 
     if (!user) {
       res.send({
         message: "USER NOT FOUND",
         proceed: false,
       });
       return;
     }
 
     // Compare password hashes to verify the user's password
 
     if (!(user.Password === data.Password)) {
       res.send({
         message: "INCORRECT PASSWORD",
         proceed: false,
       });
       return;
     }
 
     // Generate and return a JWT token using jwtUtils.generateJwtToken(user)
     const token = jwtUtils.generateJwtToken(user);
     // Return user data and JWT token
     res.send({
       data: {
         UserID: user._id.toString(),
         email: user.Email,
         UserName: user.name,
       },
       token,
       message: "USER SIGNED IN SUCCESSFULLY",
       proceed: true,
     });
  } catch (error) {
     console.error(error);
     res.status(500).send({
       message: "ERROR SIGNING IN",
       proceed: false,
     });
  }
 });

 // Logout route
router.post("/Logout", async (req, res) => {
  // Get the JWT token from the request header
  const token = req.headers["authorization"];

  // Validate the token
  const decodedToken = jwtUtils.verifyJwtToken(token);
  if (!decodedToken) {
    res.status(401).send({
      message: "INVALID TOKEN",
    });
    return;
  }

  // Invalidate the user's JWT token
  jwtUtils.invalidateJwtToken(token);

  // Send a success response
  res.send({
    message: "USER LOGGED OUT SUCCESSFULLY",
  });
});



router.post("/password-recovery-request", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a recovery token
    const recoveryToken = jwtUtils.generatePasswordRecoveryToken(user);

    // Send the recovery token to the user's email
    jwtUtils.sendRecoveryEmail(user.email, recoveryToken);

    res.status(200).json({ message: "Recovery token sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating recovery token" });
  }
});

router.post("/password-recovery", async (req, res) => {
  const { email, newPassword, recoveryToken } = req.body;

  // Your token validation method
  const decodedToken = jwtUtils.validatePasswordRecoveryToken(recoveryToken);

  if (!decodedToken || decodedToken.action !== "passwordRecovery" || decodedToken.email !== email) {
    return res.status(400).json({ message: "Invalid or expired recovery token" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Change password
    const result = await jwtUtils.changePassword(user._id, newPassword);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in password recovery" });
  }
});



module.exports = router;
