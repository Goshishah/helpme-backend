const bcrypt = require("bcrypt");
const pool = require("../db");
const baseModel = require("../utils/base.model");

const getAllUsers = (req, res) => {
  const { type = null } = req.query;
  getRoleByRoleName({ name: type })
    .then((result) => {
      let query = "";
      let roleId = "";
      if (result.rows.length > 0) {
        roleId = result.rows[0].id;
        query = `
        SELECT accounts.id, accounts.firstname, accounts.lastname, accounts.username, accounts.email, accounts.created_on, accounts.last_login 
        FROM accounts
        INNER JOIN account_roles
        ON accounts.id = account_roles.user_id AND account_roles.role_id = $1`;
      } else {
        query = `SELECT id, firstname, lastname, username, email, created_on, last_login FROM accounts`;
      }

      pool.query(query, [roleId], async (error, result) => {
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
    })
    .catch((error) => {
      console.log("getAllUsers getRoleByRoleName", error);
      res.send(error);
    });
};

const addUser = (req, res) => {
  try {
    getUserByEmail({ email: req.body.email })
      .then((result) => {
        if (result.rows.length > 0) {
          const resultModel = baseModel({
            success: true,
            message: `User with ${req.body.email} email already exist.`,
            data: null,
          });
          res.status(200).json(resultModel);
        } else {
          getUserByUsername({ username: req.body.username }).then((result) => {
            if (result.rows.length > 0) {
              const resultModel = baseModel({
                success: true,
                message: `User name ${req.body.username} is not available.`,
                data: null,
              });
              res.status(200).json(resultModel);
            } else {
              getRoleByRoleName({ name: req.body.roleName || "" }).then(
                (roleResult) => {
                  if (roleResult.rows.length > 0) {
                    const role = roleResult.rows[0];
                    createUser({ user: req.body })
                      .then((userResult) => {
                        if (userResult.rows.length > 0) {
                          const userId = userResult.rows[0].id;
                          assignUserRole({ userId, roleId: role.id })
                            .then((result) => {
                              if (result.rows.length > 0) {
                                const resultModel = baseModel({
                                  success: true,
                                  message: "user is created successfully.",
                                  data: { ...userResult.rows, role },
                                });
                                res.status(200).json(resultModel);
                              } else {
                                const resultModel = baseModel({
                                  success: false,
                                  message: "user not created.",
                                });
                                res.status(200).json(resultModel);
                              }
                            })
                            .catch((error) => {
                              console.log("error", error);
                              res.send(error);
                            });
                        }
                      })
                      .catch((error) => {
                        console.log("error", error);
                        res.send(error);
                      });
                  } else {
                    const resultModel = baseModel({
                      success: false,
                      message: "something goes wrong please try again!",
                    });
                    res.status(200).json(resultModel);
                  }
                }
              );
            }
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.send(error);
      });
  } catch (error) {
    console.log("API register error", error);
    res.json(error);
  }
};

///////////////////////////////////
const getUserByEmail = ({ email }) => {
  const query = `SELECT * FROM accounts WHERE email = $1`;
  return pool.query(query, [email]);
};

const getUserByUsername = ({ username }) => {
  const query = `SELECT * FROM accounts WHERE username = $1`;
  return pool.query(query, [username]);
};

const getRoleByRoleName = ({ name }) => {
  const query = `SELECT * FROM roles WHERE name = $1`;
  return pool.query(query, [name]);
};

const getUserRoleByUserId = ({ userId }) => {
  const query = `SELECT account_roles.role_id as id, roles.name
                FROM account_roles 
                INNER JOIN roles
                ON account_roles.user_id = $1 AND account_roles.role_id = roles.id`;
  return pool.query(query, [userId]);
};

const assignUserRole = ({ userId, roleId }) => {
  const query = `INSERT INTO account_roles (user_id, role_id, grant_date)
                VALUES ($1, $2, $3) RETURNING *`;
  return pool.query(query, [userId, roleId, new Date()]);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const createUser = async ({ user }) => {
  const { firstname, lastname, username, email, password } = user;

  const created_on = new Date(),
    last_login = new Date();
  const query = `INSERT INTO accounts (firstname, lastname, username, email, password, created_on, last_login)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, firstname, lastname, username, email, created_on, last_login`;

  const hashedPassword = await hashPassword(password);
  return pool.query(query, [
    firstname,
    lastname,
    username,
    email,
    hashedPassword,
    created_on,
    last_login,
  ]);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserRoleByUserId,
  addUser,
};
