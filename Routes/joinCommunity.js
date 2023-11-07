const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());

const Community = require('../Models/Schemas')
const CommunityMember = require('../Models/Schemas')

router.post('/join-community', async (req, res) => {
    try {
      // Extract user_id and community_id from the request body
      const { user_id, community_id } = req.body;
  
      // Check if the community exists
      const community = await Community.findById(community_id);
  
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      // Create a new CommunityMember document
      const newCommunityMember = new CommunityMember({
        user_id,
        community_id,
      });
  
      // Save the new community member to the database
      await newCommunityMember.save();
  
      return res.status(201).json(newCommunityMember);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router  