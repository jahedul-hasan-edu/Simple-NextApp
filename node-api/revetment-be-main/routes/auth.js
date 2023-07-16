const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const router = express.Router();

const {
  userLogin,
  userlogout,
  userSignUp,
} = require("../services/auth-service");
const { sendErrorResp } = require("../utils/common-utils");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userLogin(email, password)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post("/signup", (req, res) => {
  userSignUp(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post("/logout", isLoggedIn, userlogout);

module.exports = router;
