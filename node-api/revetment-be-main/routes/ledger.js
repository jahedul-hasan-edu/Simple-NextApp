const express = require("express");
const { sendErrorResp } = require("../utils/common-utils");
const router = express.Router();
const {
  createLedger,
  updateLedger,
  deleteLedger,
  getLedgerById,
  getAllLedgers,
} = require("../services/ledger-service");

router.post("/", async (req, res) => {
  createLedger(req)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// API for all users to update their specific ledger by ledger id
router.patch("/:ledger_id", async (req, res) => {
  const { ledger_id } = req.params;
  updateLedger(ledger_id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:ledger_id", async (req, res) => {
  const { ledger_id } = req.params;
  deleteLedger(ledger_id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// API for all users to get their specific ledger data by ledger id
router.get("/:ledger_id", async (req, res) => {
  const { ledger_id } = req.params;
  getLedgerById(ledger_id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// API for Admin and Super admin to get all ledgers
router.get("/", async (req, res) => {
  const { value, page, limit } = req.query;
  getAllLedgers(req, value, page, limit)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
