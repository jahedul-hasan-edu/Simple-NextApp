// express router
const express = require("express");
const {
  createUser,
  getAllUsers,
  getUsersInfo,
  updateUser,
  deleteUser,
  sendVerificationEmail,
  verifyEmail,
  resetPassword,
} = require("../services/user-service");
const router = express.Router();
// models
const { sendErrorResp } = require("../utils/common-utils");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, async (req, res) => {
  getAllUsers(req.query.page, JSON.parse(req.query.sortBy), req.query.showing)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/info", isLoggedIn, async (req, res) => {
  getUsersInfo()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post("/", isLoggedIn, async (req, res) => {
  createUser(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/", isLoggedIn, async (req, res) => {
  updateUser(req.jwt.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  deleteUser(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Reset password suing Email APIs start here
router.post("/send-verification-email", async (req, res) => {
  const { email } = req.body;
  sendVerificationEmail(email)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post("/verify-email", async (req, res) => {
  const { email, otp } = req.body;
  verifyEmail(email, otp)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  resetPassword(email, password)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});
// Reset password suing Email APIs end here

module.exports = router;
