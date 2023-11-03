const jwt = require("jsonwebtoken");

const secretKey = "YOUR_SECRET_KEY"; // Replace with your actual secret key

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
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    return null; // Invalid token
  }
}

module.exports = { generateJwtToken, verifyJwtToken };
