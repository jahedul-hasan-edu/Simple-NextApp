const log = require("../utils/logger");
const { document } = require("../models");
const { Sequelize } = require("sequelize");
const { getPreSignedUrlFromS3Url } = require("../utils/common-utils");

const createDocument = async (req) => {
  try {
    let documentResult = await document.create({
      ...req.body,
      userId: req.jwt.id,
    });

    return {
      status: 200,
      message: "Document created successfully",
      document: documentResult,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const searchDocument = async (value, page, limit) => {
  try {
    const offset = (page - 1) * limit;

    let clause = {
      name: {
        [Sequelize.Op.iLike]: `${value}%`,
      },
    };

    let whereClause;

    if (value) {
      whereClause = clause;
    }

    let documentData = await document.findAll({
      where: whereClause,
      attributes: { exclude: ["updatedAt"] },
      raw: true,
      limit: limit,
      offset: offset,
    });

    for (let i = 0; i < documentData.length; i++) {
      documentData.url = await getPreSignedUrlFromS3Url(documentData.url);
    }

    if (!documentData) {
      return {
        status: 404,
        message: "document not Found!",
      };
    }

    const totalDocuments = await document.count({
      where: whereClause,
    });

    const total = Math.ceil(totalDocuments / limit);

    return {
      status: 200,
      total,
      documents: documentData,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const deleteDocument = async (document_id) => {
  try {
    let documentData = await document.findByPk(document_id);
    if (!documentData) {
      return {
        status: 400,
        message: "No Document found",
      };
    }
    await documentData.destroy();
    return {
      status: 200,
      message: "Document deleted successfully",
      deletedDocument: documentData,
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
  createDocument,
  deleteDocument,
  searchDocument,
};
