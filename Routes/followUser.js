const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());

const UserData = require("../Models/UserModel");

router.put("/follow", async (req, res) => {
  try {
    const data = req.body;

    const isAlreadyFollowing = await UserData.findOne({
        _id: data.user_id,
        following: data.followingUserId,
      });
  
      if (isAlreadyFollowing) {
        // User is already following the target user, so do nothing
        res.status(200).json({ message: "User is already following" });
        return;
      }

    const followingUser = await UserData.findByIdAndUpdate(
      data.user_id,
      {
        $push: { following: data.followingUserId },
      },
      { new: true } // Return the updated post
    );

    const followerUser = await UserData.findByIdAndUpdate(
      data.followingUserId,
      {
        $push: { followers: data.user_id },
      },
      { new: true } // Return the updated post
    );

    res.status(200).json({
      message: "Successfully followed user",
      followingUser,
      followerUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error following user" });
  }
});

module.exports = router;