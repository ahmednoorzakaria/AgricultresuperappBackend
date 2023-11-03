const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());

const jwtUtils = require("./jwtUtils"); // Import JWT-related functions and secret key

// Local imports
const User = require("../Models/UserModel");

// Login route
router.post("/Signin", async (req, res) => {
    const data = req.body;

    // Validate email pattern using regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.Email)) {
        res.send({
            message: "INVALID EMAIL ADDRESS",
            proceed: false,
        });
        return;
    }

    // Validate password pattern using regular expression
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&*])(?=.{8,})/;
    if (!passwordPattern.test(data.Password)) {
        res.send({
            message: "INVALID PASSWORD",
            proceed: false,
        });
        return;
    }

    // Check if user exists in the database
    try {
        const user = await User.findOne({
            Email: data.Email,
        });

        if (!user) {
            res.send({
                message: "USER NOT FOUND",
                proceed: false,
            });
            return;
        }

        // Compare password hashes to verify the user's password
        const match = await bcrypt.compare(data.Password, user.HashedPassword);

        if (!match) {
            res.send({
                message: "INCORRECT PASSWORD",
                proceed: false,
            });
            return;
        }

        // Generate and return a JWT token using jwtUtils.generateJwtToken(user)
        const token = jwtUtils.generateJwtToken(user);

        // Return user data and JWT token
        res.send({
            data: {
                UserID: user._id.toString(),
                Name: user.Name,
                Email: user.Email,
                UserName: user.UserName,
            },
            token,
            message: "USER SIGNED IN SUCCESSFULLY",
            proceed: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "ERROR SIGNING IN",
            proceed: false,
        });
    }
});

module.exports = router;
