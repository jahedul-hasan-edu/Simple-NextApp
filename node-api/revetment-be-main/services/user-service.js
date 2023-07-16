const log = require("../utils/logger");
const { user, user_roles } = require("../models");
const { Op } = require("sequelize");
const { hashPassword } = require("./pwd-service");
const transporter = require("../nodemailer");
const { getPreSignedUrlFromS3Url } = require("../utils/common-utils");

const createUser = async (body) => {
  try {
    let hashedPass = await hashPassword(body.password);
    let createdUser = await user.create({ ...body, password: hashedPass });
    return {
      status: 200,
      message: "User created successfully",
      station: createdUser,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const getUsersInfo = async () => {
  try {
    let userCount = await user.count({
      where: {
        role: { [Op.not]: "super admin" },
      },
    });

    if (!userCount) {
      return {
        status: 400,
        message: "No User found",
      };
    } else {
      return {
        status: 200,
        message: "User found",
        count: userCount,
        page: Math.ceil(userCount / 10),
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const sendVerificationEmail = async (email) => {
  try {
    const userData = await user.findOne({
      where: { email },
    });

    if (!userData) {
      return {
        status: 400,
        message: "User not found",
      };
    }

    // 6 digit random number
    let otp = Math.floor(100000 + Math.random() * 900000);

    await user.update({ otp }, { where: { email } });

    const mailOptions = {
      from: "salmannaqvi461@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Verify Email!", // Subject line
      text: `Hi ${email}, Your verification code is ${otp}. Thanks`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("transporter Error =======>>> ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return {
      status: 200,
      message: "Email sent successfully!",
      otp,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const verifyEmail = async (email, otp) => {
  try {
    const userEmail = await user.findOne({
      where: { email },
    });

    if (userEmail.otp == otp) {
      return {
        status: 200,
        message: "User verified successfully",
      };
    } else {
      return {
        status: 400,
        message: "User not verified",
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const updateUser = async (userid, updates) => {
  try {

    const { profileImage } = updates;

    let userData = await user.findByPk(userid, {
      attributes: { exclude: ["password"] },
    });

    if (!userData) {
      return {
        status: 400,
        message: "No User found",
      };
    }

    if (profileImage) {
      let img = await getPreSignedUrlFromS3Url(profileImage)
      updates.profileImage = img;
    }

    //**** Deleting these two because they shouldn't be allowed to be updated *** */
    delete updates.password;
    delete updates.id;
    // delete updates.role;
    // delete updates.roleId;

    await userData.update(updates);

    return {
      status: 200,
      message: "User updated successfully",
      user: userData,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const resetPassword = async (email, password) => {
  try {
    const userData = await user.findOne({
      where: { email },
    });

    if (!userData) {
      return {
        status: 400,
        message: "User not found",
      };
    }

    let hashedPass = await hashPassword(password);

    await user.update(
      { password: hashedPass, otp: null },
      { where: { email } }
    );

    return {
      status: 200,
      message: "Password reset successfully!",
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

// if no Admin user exists, create one
const createAdmin = async () => {
  try {
    let userData = await user.findOne({
      where: { role: "super admin" },
    });
    if (!userData) {
      let createdUser = await user.create({
        firstname: "Super",
        lastname: "admin",
        email: "superadmin@gmail.com",
        password: await hashPassword("admin"),
        active: true,
        role: "super admin",
      });
      log.info("Admin created successfully");
    }
  } catch (error) {
    log.info(error);
  }
};

module.exports = {
  createUser,
  getUsersInfo,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  updateUser,
  createAdmin,
};
