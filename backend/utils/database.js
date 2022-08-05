const mysql = require("mysql");

const connect = () => {
  const con = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
  con.connect((err) => {
    if (err) {
      console.log("bd off");
    } else {
      console.log("bd working");
    }
  });
  return con;
};

module.exports = connect;
