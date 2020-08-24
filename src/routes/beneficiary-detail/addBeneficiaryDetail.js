const {
  addBeneficiaryDetail,
} = require("../../beneficiary/beneficiary.controller");

module.exports = (req, res, next) => {
  addBeneficiaryDetail(req, res, next);
};
