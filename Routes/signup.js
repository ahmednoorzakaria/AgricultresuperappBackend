const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Local imports
const UserData = require("../Models/UserModel");



// Handle User registration requests
router.post("/register", async (req, res) => {
    const data = req.body;


    // Checking if the user's email is already in use
    try {
        const emailInUse = await UserData.findOne({
            Email: data.email,
        });

        if (emailInUse) {
            return res.send({
                message: "EMAIL ALREADY IN USE",
                proceed: false,
            });
        }

        let profileImageData;

        if (req.file) {
            // If an image file is uploaded, use the uploaded file's binary data
            profileImageData = req.file.buffer;
        } else {
            // Handle the case where no image or URL is provided
            profileImageData = null;
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        delete data.password;
        data.hashedPassword = hashedPassword;
        data.bio = req.body.bio;

        const user = await UserData.create(data);

        console.log(user);

        return res.send({
            data: {
                UserID: user._id.toString(),
                Name: user.name,
                Email: user.email,
                HashedPassword: hashedPassword,
                UserName: user.userName,
                profile_img: user.profile_img,
                bio: user.bio,
            },
            message: "USER CREATED SUCCESSFULLY",
            proceed: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "ERROR SIGNING UP",
            proceed: false,
        });
    }
});

module.exports = router;
