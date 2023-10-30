const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router()
const app = express();
app.use(express.json());
app.use(cors());


//local imports
const User = require("../Models/Schemas");



//USER SIGN IN ROUTE
router.post("/Signin", async (req, res) => {
    const data = req.body;
    // Validate email pattern using regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.Email)) {
        return res.send({
            message: "INVALID EMAIL ADDRESS",
            proceed: false,
        });
    }
    // Validate password pattern using regular expression
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordPattern.test(data.Password)) {
        return res.send({
            message: "INVALID PASSWORD",
            proceed: false,
        });
    }
    // Check if user exists in the database
    try {
        const user = await User.findOne({
            Email: data.Email,
        });

        if (!user) {
            return res.send({
                message: "USER NOT FOUND",
                proceed: false,
            });
        }

        // Compare password hashes to verify the user's password
        const match = await bcrypt.compare(data.Password, user.HashedPassword);

        if (!match) {
            return res.send({
                message: "INCORRECT PASSWORD",
                proceed: false,
            });
        }

        // Return user data and successful login message
        return res.send({
            data: {
                UserID: user._id.toString(),
                Name: user.Name,
                Email: user.Email,
                UserName: user.UserName,
            },
            message: "USER SIGNED IN SUCCESSFULLY",
            proceed: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "ERROR SIGNING IN",
            proceed: false,})
    }
})


module.exports = router