const express = require("express");
const { sendErrorResp } = require("../utils/common-utils");
const router = express.Router();
const {
  createDocument,
  deleteDocument,
  searchDocument,
} = require("../services/document-service");

router.post("/", async (req, res) => {
  createDocument(req)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/", async (req, res) => {
  const { value, page, limit } = req.query;
  searchDocument(value, page, limit)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:document_id", async (req, res) => {
  const { document_id } = req.params;
  deleteDocument(document_id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
