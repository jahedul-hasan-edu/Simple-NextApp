// express router
const express = require("express");
const router = express.Router();
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");
const userRoutes = require("./users");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const ledgerRoutes = require("./ledger");
const documentRoutes = require("./document");
const { isLoggedIn } = require("../middleware/auth");

router.get("/is-logged-in", isLoggedIn, (req, res) => {
  const token = req.headers["authorization"];
  if (!token || token == "undefined") res.status(401).json("Unauthorize user");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).send("Unauthorized user");
    }

    const obj = {
      firstName: decoded.dataValues.firstname,
      lastName: decoded.dataValues.lastname,
      email: decoded.dataValues.email,
      token,
    };
    res.status(200).send(obj);
  } catch (error) {
    log.info(error);
    res.status(500).json("Something went wronge");
  }
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", isLoggedIn, adminRoutes);
router.use("/ledger", isLoggedIn, ledgerRoutes);
router.use("/document", isLoggedIn, documentRoutes);

module.exports = router;
