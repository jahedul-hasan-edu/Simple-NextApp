const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../utils/logger");

const authenticate = (authority) => {
  return (req, resp, next) => {
    getPublicKey()
      .then(() => {
        var header = req.header("Authorization");
        if (header == null) {
          if (req.query.access_token == null) {
            return Promise.reject({
              status: 401,
              message: "Full authorization is required to access this route",
            });
          } else {
            header = "Bearer " + req.query.access_token;
          }
        }

        const token = header.split(" ").pop();
        try {
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          return Promise.resolve(decodedToken);
        } catch (e) {
          console.error("Error occurred while decoding access token", e);
          return Promise.reject({
            status: 400,
            message: "Could not decode Access Token",
          });
        }
      })
      .then(async (decoded) => {
        req.jwt = decoded;
        if (decoded.authorities == undefined || decoded.authorities == null) {
          return Promise.reject({
            status: 401,
            message: "You do not have authority to access this resource",
          });
        }

        const authorities = authority.split(",");

        if (authorities.length === 1 && authorities[0] === "") {
          next();
          return Promise.resolve();
        }

        for (let index = 0; index < authorities.length; index++) {
          const auth = authorities[index].trim();

          if (decoded.authorities.indexOf(auth) > -1) {
            next();
            return Promise.resolve();
          }
        }
        return Promise.reject({
          status: 401,
          message: "You do not have authority to access this resource",
        });
      })
      .catch((error) => {
        resp.status(401).send({
          status: 401,
          message:
            error.message || "You are unauthorized to access this resource",
          error,
        });
      });
  };
};

// ==================================== check token validation ========================

const isLoggedIn = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || token == "undefined") {
    res.status(401).json("Unauthorize user");
    return 0;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).send("Unauthorized user");
      // next();
    }

    req.jwt = decoded;

    next();

    // next();
  } catch (error) {
    logger.info(error);
    res.status(500).json("Something went wrong");
  }
};

module.exports = {
  authenticate,
  isLoggedIn,
};
