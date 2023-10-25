const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const UserData = require("./Models/UserDataModel");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000

app.post("/SignIn", async (req, res) => {
    const data = req.body;
    try {
      const user = await UserData.findOne({
        Email:data.Email,
      });
      
  
      console.log(user.Email);
  
      if (user.Email != data.Email) {
        return res.send({
          message: `USER NOT FOUND`,
          proceed: false,
        });
      }
  
      const match = await bcrypt.compare(data.Password, user.HashedPassword);
      if (!match) {
        return res.send({
          message: `INCORRECT PASSWORD`,
          proceed: false,
        });
      }
  
      return res.send({
        data: {
          UserID: user._id.toString(),
          Name: user.Name,
          Email: user.Email,
          UserName: user.UserName
        },
        message: `USER SIGNED IN SUCCESSFULLY`,
        proceed: true,
      });
    } catch (error) {
      return res.send("ERROR SIGNING IN");
    }
  });

  app.post("/SignUp", async (req, res) => {
    const data = req.body;
    try {
      const emailInUse = await UserData.findOne({
        Email: data.Email,
      });
      if (emailInUse) {
        return res.send({
          message: `EMAIL ALREADY IN USE`,
          proceed: false,
        });
      }
      
  
      const saltRounds = 12; // increase the number of salt rounds
      const hashedPassword = await bcrypt.hash(data.Password, saltRounds);
  
      delete data.Password;
      data.HashedPassword = hashedPassword;
  
      const user = await UserData.create(data);
      return res.send({
        data: {
          UserID: user._id.toString(),
          Name: user.Name,
          Email: user.Email,
          HashedPassword: user.HashedPassword,
          UserName: user.UserName
        },
        message: `USER CREATED SUCCESFULLY`,
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