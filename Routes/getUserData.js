const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const UserData = require('../Models/UserModel');

router.get('/users/:userId', async (req, res) => {
    try {
      // Extract the user ID from the URL parameter
      const userId = req.params.userId;
  
      // Query the database to find the user by ID
      const user = await UserData.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(user.name);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
 