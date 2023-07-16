"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();
const createRoles = require("../services/role-service");
const basename = path.basename(__filename);
const log = require("../utils/logger");
const { hashPassword } = require("../services/pwd-service");

const db = {};


let sequelize = new Sequelize({
  database: `${process.env.DB}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  dialect: "postgres",
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { user, user_roles, ledger } = db;

// Relation between user and user_roles
user.belongsTo(user_roles, {
  foreignKey: "roleId",
  targetKey: "id",
  as: "user_role",
});

user_roles.hasMany(user, {
  foreignKey: "roleId",
  targetKey: "id",
  as: "user",
});

// Relation between user and ledger
ledger.belongsTo(user, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});

user.hasMany(ledger, {
  foreignKey: "userId",
  targetKey: "id",
  as: "ledger",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const createAdmin = async () => {
  try {
    let userData = await user.findOne({
      where: { roleId: 1 },
    });
    if (!userData) {
      let createdUser = await user.create({
        firstname: "Super",
        lastname: "admin",
        email: "superadmin@gmail.com",
        password: await hashPassword("admin"),
        active: true,
        role: "super admin",
        isVerified: true,
        roleId: 1
      });
      log.info("Admin created successfully");
    }
  } catch (error) {
    log.info(error);
  }
};

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("Synced");
  // Below fuction will check if roles and admin created or not, if not then it will create admin roles otherwise it will do nothing
  createAdmin();
  createRoles(user_roles);
});

module.exports = db;
