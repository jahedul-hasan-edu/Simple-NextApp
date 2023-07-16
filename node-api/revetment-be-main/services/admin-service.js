const log = require("../utils/logger");
const { user } = require("../models")
const transporter = require('../nodemailer');
const bcrypt = require("bcrypt");

const createUser = async (body) => {
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
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
}

const verifyUser = async (userId, role, isVerified) => {
    try {
        await user.update({ isVerified },
            {
                where: {
                    id: userId
                }
            }
        )

        const userData = await user.findOne({ where: { id: userId } })

        const mailOptions = {
            from: "salmannaqvi@metavystic.com", // sender address
            to: userData.email, // list of receivers
            subject: isVerified ? "Account Verified!" : "Account not verfied!", // Subject line
            text: isVerified ? `Hi ${userData.email}, Your account is succesfully verified by our admin! You can now login to your account as ${role}. Thanks` : `Hi ${userData.email}, Your account is no more verified by our admin! You can no more login to your account as ${role}. Thanks`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('transporter Error =======>>> ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return {
            status: 200,
            message: "User Verified successfully and email sent successfully!",
            user: userData,
        };

    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
}

const getAllUsers = async (
    page = 1,
    sortBy = [["id", "ASC"]],
    showing = 10
) => {
    try {
        let allUsers = await user.findAll({
            limit: showing,
            // offset: page * showing,
            order: sortBy,
        });
        if (!allUsers) {
            return {
                status: 400,
                message: "No User found",
            };
        } else {
            return {
                status: 200,
                message: "User found",
                users: allUsers,
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

const deleteUser = async (userid) => {
    try {
        await user.destroy({
            where: {
                id: userid,
            },
        });
        return {
            status: 200,
            message: "User deleted successfully",
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
};

module.exports = {
    createUser,
    verifyUser,
    getAllUsers,
    deleteUser
}