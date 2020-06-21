var mysql = require("mysql");
var express = require("express");
const routes = require("./routes");
const { response } = require("express");
require('dotenv').config();

// Create connection to mysql db
var connection = mysql.createConnection({
    host: "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err) {
      throw err;
    }
    console.log('Connection established');
});

var server = express();
var bodyParser = require("body-parser");

server.listen("3000", () => {
    console.log(`Server started on port 3000`);
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser());
server.use(routes);






// connection.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
// });
