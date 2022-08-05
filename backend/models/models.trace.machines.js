const mysql = require("../utils/database.js");

class Machines {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getMachines() {
    const con = mysql();
    con.query("SELECT * FROM maquinarias", (err, result) => {
      con.end();
      if (err) {
        return this.res.status(400).json({ error: err.sqlMessage });
      }
      return this.res.json({ maquinarias: JSON.parse(JSON.stringify(result)) });
    });
  }

  updateStateById() {
    const { id } = this.req.params;
    const { estado } = this.req.body;
    const con = mysql();
    con.query(
      "UPDATE maquinarias SET estado = ? WHERE codigo = ?",
      [estado, id],
      (err) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        return this.res.json({ message: "Estado actualizado" });
      }
    );
  }
}

module.exports = Machines;
