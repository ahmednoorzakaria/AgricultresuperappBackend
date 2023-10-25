const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const UserData = require("./Models/UserDataModel");

const app = express();
app.use(express.json());
app.use(cors());

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
        },
        message: `USER SIGNED IN SUCCESSFULLY`,
        proceed: true,
      });
    } catch (error) {
      return res.send("ERROR SIGNING IN");
    }
  });

  const start = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://ndabasteve1:dogimoto@test.wgtg2tr.mongodb.net/test?retryWrites=true&w=majority"
      );
      app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  
  start();