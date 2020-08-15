const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const port = 8080;
const app = express();

app.use(bodyParser.json());

//application routing
app.use(routes);
app.listen(port, () => {
  console.log(`Application is listening at http://localhost:${port}`);
});
