const mysql = require("../utils/database.js");

class Formed {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  registerFormed() {
    const con = mysql();
    const {
      lotId,
      machineId,
      checkInTime,
      comments,
      humidity,
      quantity,
      temperature,
    } = this.req.body;
    con.query(
      "SELECT * FROM formadocrecimiento WHERE idLote = ?",
      [lotId],
      (err, result) => {
        if (err) {
          con.end();
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        const ans = JSON.parse(JSON.stringify(result));
        if (ans.length > 0) {
          con.end();
          return this.res.status(400).json({
            error: `El lote de producción ${lotId} ya pasó por el proceso`,
          });
        }
        con.query(
          "INSERT INTO formadocrecimiento (idLote, idMaquina, horaIngreso, temperatura, humedad, cantidades, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            lotId,
            machineId,
            checkInTime,
            temperature,
            humidity,
            quantity,
            comments,
          ],
          (err, result) => {
            con.end();
            if (err) {
              return this.res.status(400).json({ error: err.sqlMessage });
            }
            return this.res.json({ message: "Formulario registrado" });
          }
        );
      }
    );
  }
}

module.exports = Formed;
