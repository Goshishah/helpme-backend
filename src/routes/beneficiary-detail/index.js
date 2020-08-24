const beneficiaryDetail = require("express").Router(),
  { authenticateToken } = require("../../auth/auth.controller"),
  getAllBeneficiariesDetail = require("./getAllBeneficiariesDetail"),
  getBeneficiaryDetailById = require("./getBeneficiaryDetailById"),
  addBeneficiaryDetail = require("./addBeneficiaryDetail");

beneficiaryDetail.get("/", getAllBeneficiariesDetail);
beneficiaryDetail.get("/:userId", getBeneficiaryDetailById);
beneficiaryDetail.post("/", authenticateToken, addBeneficiaryDetail);

module.exports = beneficiaryDetail;
