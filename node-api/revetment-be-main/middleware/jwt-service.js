const jwt = require("jsonwebtoken");
const log = require("../utils/logger");
// require('dotenv').config()
const returnJWT = async (email, password, id) => {
  try {
    let token = jwt.sign(
      {
        email,
        password,
        id
      },
      process.env.JWT_SECRET,
      // { expiresIn: "12h" }
    );
    return {
      success: true,
      message: "Authentication successful!",
      token: token,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wronge",
    };
  }
};

module.exports = {
  returnJWT,
};
