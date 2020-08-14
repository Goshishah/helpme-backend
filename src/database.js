"use strict";

const pg = require("pg");
const connectionString = "postgres://postgres:admin@123@localhost/helme";

const getUser = (email) => {
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return console.error("error fetching client from pool", err);
    }
    client.query(
      "SELECT $1::varchar AS my_first_query",
      [email],
      (err, result) => {
        done();

        if (err) {
          return console.error("error happend during query", err);
        }
        console.log(result.rows);
        process.exit(0);
      }
    );
  });
  return {};
};

module.exports.getUser = getUser;
