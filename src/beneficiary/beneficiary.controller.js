const pool = require("../db");
const baseModel = require("../utils/base.model");

const getAllBeneficiariesDetail = (req, res, next) => {
  const query = `SELECT * FROM beneficiary_detail`;

  pool.query(query, async (error, result) => {
    if (error) {
      throw error;
    }

    const resultModel = baseModel({
      success: true,
      message: "data fetched successfully.",
      data: result.rows,
    });
    res.status(200).json(resultModel);
  });
};

const getBeneficiariesDetailById = (req, res, next) => {
  const query = `SELECT * FROM beneficiary_detail WHERE user_id = $1`;
  pool.query(query, [req.params.userId], async (error, result) => {
    if (error) {
      throw error;
    }

    const resultModel = baseModel({
      success: true,
      message: "data fetched successfully.",
      data: result.rows,
    });
    res.status(200).json(resultModel);
  });
};

const addBeneficiaryDetail = (req, res, next) => {
  const beneficiary = req.body;
  createBeneficiary(beneficiary)
    .then((result) => {
      const resultModel = baseModel({
        success: true,
        message: "data fetched successfully.",
        data: result.rows[0],
      });
      res.status(200).json(resultModel);
    })
    .catch((error) => {
      console.log("error", error);

      const resultModel = baseModel({
        success: false,
        message: error,
      });
      res.status(200).json(resultModel);
    });
};

const createBeneficiary = (beneficiary) => {
  const {
    userId,
    image,
    title,
    summary,
    raisedAmount,
    requiredAmount,
  } = beneficiary;

  const created_on = new Date();
  const query = `INSERT INTO beneficiary_detail (user_id, image, title, summary, raised_ammount, required_ammount, created_on)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  return pool.query(query, [
    userId,
    image,
    title,
    summary,
    raisedAmount,
    requiredAmount,
    created_on,
  ]);
};

module.exports = {
  getAllBeneficiariesDetail,
  getBeneficiariesDetailById,
  addBeneficiaryDetail,
};
