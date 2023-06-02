const mysql = require("mysql");
require('dotenv/config');

module.exports = mysql.createConnection({
    host: "localhost",
    dialect: "mysql",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3307,
    socketPath: '/var/run/mysqld/mysqld.sock',
});