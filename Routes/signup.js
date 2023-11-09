const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());


// Local imports
const UserData = require("../Models/UserModel");

// Improved email validation regular expression
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Handle User registration requests
router.post("/register", async (req, res) => {
    const data = req.body;

    // Check if the email is provided and matches the regular expression
    if (!data.email || !emailPattern.test(data.email)) {
        return res.status(400).json({
            message: "INVALID EMAIL ADDRESS",
            proceed: false,
        });
    }

  

    // Checking if the user's email (case-insensitive) is already in use
    try {
        const emailInUse = await UserData.findOne({
            email: { $regex: new RegExp(data.email, "i") }, // Case-insensitive email search
        });

        if (emailInUse) {
            return res.status(400).json({
                message: "EMAIL ALREADY IN USE",
                proceed: false,
            });
        }

        


        delete data.password;
        data.bio = req.body.bio;
        data.profile_img = req.body.profile_img

        try {
            const user = await UserData.create(data);
            console.log(user);
            return res.status(201).json({
                data: {
                    UserID: user._id.toString(),
                    Name: user.name,
                    Email: user.email.toLowerCase(),
                    Password: user.Password,
                    UserName: user.userName,
                    profile_img: user.profile_img,
                    bio: user.bio,
                },
                message: "USER CREATED SUCCESSFULLY",
                proceed: true,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Email is in use",
                proceed: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "ERROR SIGNING UP",
            proceed: false,
        });
    }
});

module.exports = router;
