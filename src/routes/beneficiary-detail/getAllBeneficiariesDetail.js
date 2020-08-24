const {
  getAllBeneficiariesDetail,
} = require("../../beneficiary/beneficiary.controller");

module.exports = (req, res, next) => {
  getAllBeneficiariesDetail(req, res, next);
};
