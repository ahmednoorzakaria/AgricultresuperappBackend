const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Community = require('../Models/Schemas')

router.post('/communities', async (req, res) => {
    try {
      // Extract community data from the request body
      const { community_name, description, community_image } = req.body;
  
      // Create a new Community document
      const newCommunity = new Community({
        community_name,
        description,
        community_image,
      });
  
      // Save the new community to the database
      await newCommunity.save();
  
      return res.status(201).json(newCommunity);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router
  