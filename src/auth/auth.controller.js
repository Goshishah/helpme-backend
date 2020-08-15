// import AuthModel from "./auth.model";

const login = (req, res) => {
  let user = req.body;
  const { email } = user;
  if (email === "superadmin@helpme.pk") {
    user = {
      email,
      isAuthenticated: true,
      roles: [{ id: 1, name: "SUPER_ADMIN" }],
    };
  } else if (email === "admin@helpme.pk") {
    user = {
      email,
      isAuthenticated: true,
      roles: [{ id: 1, name: "ADMIN" }],
    };
  } else if (email === "user@helpme.pk") {
    user = { email, isAuthenticated: true, roles: [{ id: 1, name: "USER" }] };
  }
  res.json(user);
};

const logout = (req, res) => {
  let user = req.body;
  const { email } = user;
  user = { email, isAuthenticated: false, roles: [{ id: 1, name: "USER" }] };
  res.json(user);
};

module.exports = {
  login,
  logout,
};
