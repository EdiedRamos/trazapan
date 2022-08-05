const mysql = require("../utils/database.js");

class References {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getReferences() {
    const con = mysql();
    con.query("SELECT * FROM referencias", (err, result) => {
      con.end();
      if (err) {
        return this.res.status(400).json({ error: err.sqlMessage });
      }
      return this.res.json({ referencias: result });
    });
  }
}

module.exports = References;
