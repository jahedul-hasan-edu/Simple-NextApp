const { user } = require("../models");
const logger = require("../utils/logger");
const { returnJWT } = require("../middleware/jwt-service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userLogin = async (email, password) => {
  try {
    email = email.toLowerCase();
    let userData = await user.findOne({
      where: { email },
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!userData) {
      return {
        status: 401,
        message: "Invalid email or password!",
      };
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return {
        status: 401,
        message: "Invalid email or password!",
      };
    }

    // const jwtExpirey = 60 * 60 * 1000 * 30;
    const jwt = await returnJWT(email, password, userData.id);
    //   let session = await createSession(user.id);

    //***** Deleting password from reponse ******* */
    delete userData.password;
    return {
      status: 200,
      message: "User login logged successfully!",
      jwt: jwt,
      userData: userData,
    };
  } catch (error) {
    logger.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

exports.userlogout = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token || token == "undefined")
      res.status(401).send("Unauthorize user");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).send("Unauthorized user");
    }
    await token.destroy();
    // blacklist.add(token);
    res.status(200).send("Logout Successfully");
  } catch (error) {
    logger.info(error);
    res.send(error);
  }
};

exports.userSignUp = async (body) => {
  try {
    const { email, password } = body;

    const userExists = await user.findOne({
      where: { email },
    });

    if (userExists) {
      return {
        status: 409,
        message: "user already exists!",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    body.password = hashPassword;

    const userData = await user.create(body);

    return {
      status: 200,
      message: "User created successfully",
      user: userData,
    };
  } catch (error) {
    logger.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};
