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
  const { name, email, address } = req.body;

  const created_on = new Date();
  const query = `INSERT INTO groups (name, email, address, created_on)
  VALUES ($1, $2, $3, $4) RETURNING *`;

  pool
    .query(query, [name, email, address, created_on])
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

const updateGroup = (req, res) => {
  const { id, name, email, address } = req.body;
  const query = `UPDATE groups
                SET name = $2, email = $3, address = $4
                WHERE groups.id = $1
                RETURNING *`;

  pool
    .query(query, [id, name, email, address])
    .then((result) => {
      const resultModel = baseModel({
        success: true,
        message: "group updated successfully.",
        data: result.rows[0],
      });
      res.status(200).json(resultModel);
    })
    .catch((error) => {
      const resultModel = baseModel({
        success: false,
        message: error,
      });
      res.status(200).json(resultModel);
    });
};

const deleteGroup = (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM groups WHERE id = $1 RETURNING *`;

  pool
    .query(query, [id])
    .then((result) => {
      const resultModel = baseModel({
        success: true,
        message: "group deleted successfully.",
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

module.exports = {
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroup,
};
