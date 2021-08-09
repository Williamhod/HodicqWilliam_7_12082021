const mysql = require("mysql");
//connexion db 

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_password,
    database: "socialmedia",
});
  
module.exports = db;
  