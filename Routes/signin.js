const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mutler = require("multer")
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());
const storage = mutler.memoryStorage();
const upload = mutler({ storage: storage })


//local imports
const UserData = require("../Models/UserDataModel");

//Handle User registration requests
router.post("/register", async (req, res) => {
    const data = req.body;

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

        const hashedPassword = await bcrypt.hash(data.Password, 12);

        delete data.Password;
        data.HashedPassword = hashedPassword;
        data.profile_img = req.file.buffer;
        //data.Bio = bio;

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
        return res.status(500).send({
            message: "ERROR SIGNING UP",
            proceed: false,})
    }
});


module.exports = router