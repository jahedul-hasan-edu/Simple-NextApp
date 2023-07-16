const log = require("../utils/logger");
const { ledger, user } = require("../models");
const { Sequelize } = require("sequelize");
const { getPreSignedUrlFromS3Url } = require("../utils/common-utils");

// CRUD operations for ledger starts here
const createLedger = async (ledgerData) => {
    try {

        let geom = Sequelize.fn(
            "ST_MakePoint",
            ledgerData.body.lon,
            ledgerData.body.lat
        );

        let createdLedger = await ledger.create(
            {
                ...ledgerData.body,
                geom: geom,
                userId: ledgerData.jwt.id
            },
        );

        // let createdLedger = await ledger.findOne({
        //     where: {
        //         id: addLedger.id
        //     },
        //     include: [
        //         {
        //             model: user,
        //             attributes: { exclude: ['createdAt', 'updatedAt'] },
        //             as: "user",
        //         },
        //     ],
        //     attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] }
        // });

        return {
            status: 200,
            message: "Ledger created successfully",
            ledger: createdLedger,
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
};

const updateLedger = async (ledger_id, data) => {
    try {
        let ledgerData = await ledger.findByPk(ledger_id);

        if (!ledgerData) {
            return {
                status: 400,
                message: "No Ledger found",
            };
        }

        let updatedLedger = await ledgerData.update(data);

        return {
            status: 200,
            message: "Ledger updated successfully",
            ledger: updatedLedger,
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
};

const deleteLedger = async (ledger_id) => {
    try {
        let ledgerData = await ledger.findByPk(ledger_id);

        if (!ledgerData) {
            return {
                status: 400,
                message: "No Ledger found",
            };
        }

        await ledgerData.destroy();

        return {
            status: 200,
            message: "Ledger deleted successfully",
            deletedLedger: ledgerData,
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
};

const getLedgerById = async (ledger_id) => {
    try {
        let ledgers = await ledger.findByPk(ledger_id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true
        })

        if (!ledgers) {
            return {
                status: 404,
                message: "Ledger not Found!"
            }
        }

        let sketch = ledgers.sketch;
        let uploadImage = ledgers.uploadImage;

        for (let i = 0; i < sketch.length; i++) {
            sketch[i] = await getPreSignedUrlFromS3Url(sketch[i]);
        }

        for (let i = 0; i < uploadImage.length; i++) {
            uploadImage[i] = await getPreSignedUrlFromS3Url(uploadImage[i]);
        }

        ledgers.sketch = sketch;
        ledgers.uploadImage = uploadImage;

        return {
            status: 200,
            ledger: ledgers
        }
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
}

const getAllLedgers = async (req, value, page, limit) => {
    try {
        const offset = (page - 1) * limit;
        let userRecord = await user.findByPk(req.jwt.id);

        if (!userRecord) {
            return {
                status: 404,
                message: "User not Found!"
            }
        }

        let clause = {
            [Sequelize.Op.or]: [
                {
                    schemeName: {
                        [Sequelize.Op.iLike]: `${value}%`
                    }
                },
                {
                    structureName: {
                        [Sequelize.Op.iLike]: `${value}%`
                    }
                },
            ]
        };
        let whereClause;

        if (userRecord.roleId !== 1 && userRecord.roleId !== 2) {
            if (value) {
                whereClause = {
                    ...clause,
                    userId: req.jwt.id
                }
            }
            else {
                whereClause = { userId: req.jwt.id }
            }
        } else if (value) {
            whereClause = clause
        }


        let ledgers = await ledger.findAll({
            where: { ...whereClause },
            attributes: { exclude: ['updatedAt'] },
            raw: true,
            limit: limit,
            offset: offset,
        })

        if (!ledgers) {
            return {
                status: 404,
                message: "Ledger not Found!"
            }
        }

        for (let i = 0; i < ledgers.length; i++) {
            let sketch = ledgers[i].sketch;
            let uploadImage = ledgers[i].uploadImage;

            for (let j = 0; j < sketch.length; j++) {
                sketch[j] = await getPreSignedUrlFromS3Url(sketch[j]);
            }

            for (let j = 0; j < uploadImage.length; j++) {
                uploadImage[j] = await getPreSignedUrlFromS3Url(uploadImage[j]);
            }

            ledgers[i].sketch = sketch;
            ledgers[i].uploadImage = uploadImage;
        }

        return {
            status: 200,
            total: ledgers.length,
            ledger: ledgers
        }

    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
}

module.exports = {
    createLedger,
    updateLedger,
    deleteLedger,
    getLedgerById,
    getAllLedgers
};