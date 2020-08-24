const {
  getBeneficiariesDetailById,
} = require("../../beneficiary/beneficiary.controller");

module.exports = (req, res, next) => {
  getBeneficiariesDetailById(req, res, next);
};
