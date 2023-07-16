// is user logged in middleware express
const bcrypt = require("bcrypt");
const log = require("../utils/logger");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const blacklist = new Set();


const hashPassword = async (password, saltRounds = 10, next) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
  // Return null if error
  return null;
};
module.exports = {
  hashPassword,
};
