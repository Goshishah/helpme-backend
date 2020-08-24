const pool = require("../db");
const baseModel = require("../utils/base.model");

const getAllGroups = (req, res) => {
  const query = `SELECT * FROM groups`;

  pool.query(query, async (error, result) => {
    if (error) {
      throw error;
    }

    const resultModel = baseModel({
      success: true,
      message: "groups are fetched successfully.",
      data: result.rows,
    });
    res.status(200).json(resultModel);
  });
};

const addGroup = (req, res) => {
  const group = req.body;
  console.log("req.body", req.body);
  createGroup(group)
    .then((result) => {
      const resultModel = baseModel({
        success: true,
        message: "groups are fetched successfully.",
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

const createGroup = (group) => {
  const { name, email, address } = group;

  const created_on = new Date();
  const query = `INSERT INTO groups (name, email, address, created_on)
  VALUES ($1, $2, $3, $4) RETURNING *`;

  return pool.query(query, [name, email, address, created_on]);
};

module.exports = {
  getAllGroups,
  addGroup,
};
