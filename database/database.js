const mysql = require("mysql");
require('dotenv/config');

module.exports = mysql.createConnection({
    host: process.env.HOST,
    dialect: 'mysql',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});