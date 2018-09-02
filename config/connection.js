var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
<<<<<<< HEAD
var sequelize = new Sequelize("marketplace_db", "root", "", {
=======
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);

} else {
var sequelize = new Sequelize("marketplace_db", "root", "12345678", {
>>>>>>> 39f6999007bd25d7aad7e2533833934ff0e9957c
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})};

// Exports the connection for other files to use
module.exports = sequelize;