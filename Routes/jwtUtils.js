const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const User = require("../Models/UserModel")

const secretKey = "123456789abcdefgh"; // Replace with your actual secret key

// Maintain an array of revoked tokens
const revokedTokens = [];

function generateJwtToken(user) {
  const payload = {
    id: user._id.toString(),
    name: user.Name,
    email: user.Email,
    username: user.UserName,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
}

function verifyJwtToken(token) {
  try {
    // Check if the token is in the revokedTokens array
    if (revokedTokens.includes(token)) {
      return null; // Token has been revoked
    }

    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    return null; // Invalid token
  }
}




module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
