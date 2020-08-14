const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const port = 8080;
const app = express();
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  let user = req.body;
  const { email } = user;
  if (email === "superadmin@helpme.pk") {
    user = {
      email,
      isAuthenticated: true,
      roles: [{ id: 1, name: "SUPER_ADMIN" }],
    };
  } else if (email === "admin@helpme.pk") {
    user = { email, isAuthenticated: true, roles: [{ id: 1, name: "ADMIN" }] };
  } else if (email === "user@helpme.pk") {
    user = { email, isAuthenticated: true, roles: [{ id: 1, name: "USER" }] };
  }
  res.json(user);
});

app.post("/api/logout", (req, res) => {
  let user = req.body;
  const { email } = user;
  res.json({ email, isAuthenticated: false, roles: [{ id: 1, name: "USER" }] });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/groups", (req, res) => {
  res.json({
    success: true,
    message: "data is fetching successfuly",
    data: [1, 3, 4, 5],
  });
});

app.get("/api/users", (req, res) => {
  db.getUser({ email: "superadmin@helpme.pk" });
});

app.listen(port, () => {
  console.log(`Application is listening at http://localhost:${port}`);
});
