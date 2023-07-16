const express = require("express");
const {
    verifyUser,
    getAllUsers,
    // editUser,
    deleteUser,
    createUser
} = require("../services/admin-service");
const { sendErrorResp } = require("../utils/common-utils");
const router = express.Router();

router.post("/create-user", (req, res) => {
    createUser(req.body)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.post("/verify-user/:userid", async (req, res) => {
    const { userid } = req.params;
    const { role, isVerified } = req.body;
    verifyUser(userid, role, isVerified)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.get("/get-all-users", async (req, res) => {
    getAllUsers()
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

router.delete("/delete-user/:userid", async (req, res) => {
    const { userid } = req.params;
    deleteUser(userid)
        .then((result) => res.status(result.status).send(result))
        .catch((error) => {
            sendErrorResp(error, req, res);
        });
});

module.exports = router;