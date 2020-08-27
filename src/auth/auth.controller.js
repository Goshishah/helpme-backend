// import AuthModel from "./auth.model";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const baseModel = require("../utils/base.model");
const addUser = require("../routes/users/addUser");
const {
  getUserByEmail,
  getUserRoleByUserId,
} = require("../users/app.users.controller");

const register = (req, res) => {
  addUser(req, res);
};

const login = (req, res) => {
  const { email, password } = req.body;
  getUserByEmail({ email })
    .then(async (userResult) => {
      if (userResult.rows.length > 0) {
        const user = userResult.rows[0];
        const isVerifyPassword = await verifyPassword(password, user.password);
        if (!isVerifyPassword) {
          const resultModel = baseModel({
            success: false,
            message: "incorrect username or password.",
          });
          res.status(200).json(resultModel);
          return;
        }
        getUserRoleByUserId({ userId: user.id })
          .then((roleResult) => {
            if (roleResult.rows.length > 0) {
              delete userResult.rows[0].password;
              const accessToken = genrateAccessToken(userResult.rows[0]);
              const resultModel = baseModel({
                success: true,
                message: "user is fetch successfully.",
                data: {
                  ...userResult.rows[0],
                  roles: roleResult.rows,
                  accessToken,
                },
              });
              res.status(200).json(resultModel);
            } else {
              const resultModel = baseModel({
                success: false,
                message: error,
              });
              res.status(200).json(resultModel);
            }
          })
          .catch((error) => {
            const resultModel = baseModel({
              success: false,
              message: error,
            });
            res.status(200).json(resultModel);
          });
      } else {
        const resultModel = baseModel({
          success: false,
          message: "incorrect username or password.",
        });
        res.status(200).json(resultModel);
      }
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
};

const logout = (req, res) => {
  const resultModel = baseModel({
    success: true,
    message: "user logged out successfuly.",
    data: null,
  });
  res.status(200).json(resultModel);
};

const verify = (req, res) => {
  getUserRoleByUserId({ userId: req.user.id })
    .then((roleResult) => {
      if (roleResult.rows.length > 0) {
        const accessToken = genrateAccessToken(req.user);
        const resultModel = baseModel({
          success: true,
          message: "user is fetch successfully.",
          data: {
            ...req.user,
            roles: roleResult.rows,
            accessToken,
          },
        });
        res.status(200).json(resultModel);
      } else {
        const resultModel = baseModel({
          success: false,
          message: error,
        });
        res.status(200).json(resultModel);
      }
    })
    .catch((error) => {
      const resultModel = baseModel({
        success: false,
        message: error,
      });
      res.status(200).json(resultModel);
    });
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genrateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  register,
  login,
  logout,
  verify,
  authenticateToken,
};
