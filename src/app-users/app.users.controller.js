const pool = require("../db");
const baseModel = require("../utils/base.model");

const appUsersController = (req, res) => {
  const query = `SELECT id, firstname, lastname, username, email, created_on, last_login FROM accounts`;

  pool.query(query, async (error, result) => {
    if (error) {
      throw error;
    }

    const resultModel = baseModel({
      success: true,
      message: "users are fetched successfully.",
      data: result.rows,
    });
    res.status(200).json(resultModel);
  });
};

module.exports = {
  users: appUsersController,
};
