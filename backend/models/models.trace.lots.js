const mysql = require("../utils/database");

class Lots {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getLotsQuantity() {
    const con = mysql();
    con.query("SELECT COUNT(codigoLote) FROM lotes", (err, result) => {
      con.end();
      if (err) {
        return this.res.status(400).json({ error: err.sqlMessage });
      }
      return this.res.json({ cantidad: result[0]["COUNT(codigoLote)"] });
    });
  }

  getLotsCode() {
    const con = mysql();
    con.query("SELECT codigoLote FROM lotes", (err, result) => {
      con.end();
      if (err) {
        return this.res.status(400).json({ error: err });
      }
      return this.res.json({ codigos: JSON.parse(JSON.stringify(result)) });
    });
  }

  getLotsReferences() {
    const con = mysql();
    con.query(
      "SELECT l.codigoLote, l.fc_listo, l.em_listo, l.linea, listo, r.nombreProducto FROM lotes AS l, referencias AS r WHERE l.idReferencias = r.identificacion",
      (err, result) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err });
        }
        return this.res.json({ codigos: JSON.parse(JSON.stringify(result)) });
      }
    );
  }

  getReadyLots() {
    const con = mysql();
    con.query(
      "SELECT l.codigoLote, r.nombreProducto FROM lotes AS l, referencias AS r WHERE l.idReferencias = r.identificacion AND l.listo = 1",
      (err, result) => {
        con.end();
        if (err) {
          return this.res.status(400).json({
            err: err.sqlMessage,
          });
        }
        return this.res.json({
          lotes: JSON.parse(JSON.stringify(result)),
        });
      }
    );
  }

  getAllFromReadyLots() {
    const con = mysql();
    con.query(
      "SELECT e.nombre, r.nombreProducto, l.*, f.*, eq.*, m.*  FROM empleados AS e, lotes AS l, formadocrecimiento AS f, empaques AS eq, referencias AS r , maquinarias AS m WHERE l.idEmpleado = e.cedula AND l.idReferencias = r.identificacion AND f.idLote = l.codigoLote AND eq.idLote = l.codigoLote AND l.listo = 1 AND eq.idMaquina = m.codigo",
      (err, result) => {
        con.end();
        if (err) {
          return this.res.status(400).json({
            error: err.sqlMessage,
          });
        }
        return this.res.json({
          lotes: JSON.parse(JSON.stringify(result)),
        });
      }
    );
  }

  getAllFromReadyLotsById() {
    const con = mysql();
    const { id: codigo } = this.req.params;
    con.query(
      "SELECT e.nombre, r.nombreProducto, l.*, f.*, eq.* FROM empleados AS e, lotes AS l, formadocrecimiento AS f, empaques AS eq, referencias AS r WHERE l.idEmpleado = e.cedula AND l.idReferencias = r.identificacion AND f.idLote = l.codigoLote AND eq.idLote = l.codigoLote AND l.listo = 1 AND l.codigoLote = ?",
      [codigo],
      (err, result) => {
        con.end();
        if (err) {
          return this.res.status(400).json({
            error: err.sqlMessage,
          });
        }
        return this.res.json({
          lotes: JSON.parse(JSON.stringify(result)),
        });
      }
    );
  }

  registerLot() {
    const con = mysql();
    const { body } = this.req;
    con.query(
      "INSERT INTO lotes (codigoLote, idReferencias, idEmpleado, jornadaLaboral, linea) values (?, ?, ?, ?, ?)",
      [
        body.codigoLote,
        body.idReferencias,
        body.idEmpleado,
        body.jornadaLaboral,
        body.linea,
      ],
      (err) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        return this.res.json({ message: "Lote registrado" });
      }
    );
  }

  updateLotFormedById() {
    const con = mysql();
    const { id } = this.req.params;
    con.query(
      "UPDATE lotes SET fc_listo = 1 WHERE codigoLote = ?",
      [id],
      (err) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        return this.res.json({ message: "Formado crecimiento listo" });
      }
    );
  }

  updateLotPackagingById() {
    const con = mysql();
    const { id } = this.req.params;
    con.query(
      "UPDATE lotes SET em_listo = 1 WHERE codigoLote = ?",
      [id],
      (err) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        return this.res.json({ message: "Empaque listo" });
      }
    );
  }

  updateLotReadyById() {
    const con = mysql();
    const { id } = this.req.params;
    con.query(
      "SELECT * FROM embalajes WHERE idLote = ?",
      [id],
      (err, result) => {
        if (err) {
          con.end();
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        const ans = JSON.parse(JSON.stringify(result));
        if (ans.length > 0) {
          con.end();
          return this.res
            .status(400)
            .json({ error: "El lote ya registrado en embalaje" });
        }
        con.query(
          "UPDATE lotes SET listo = 1 WHERE codigoLote = ?",
          [id],
          (err, result) => {
            if (err) {
              con.end();
              return this.res.status(400).json({ error: err.sqlMessage });
            }
            // obtener el nombre y la identificacion del producto
            con.query(
              "SELECT r.nombreProducto, r.identificacion FROM referencias AS r, lotes AS l WHERE r.identificacion = l.idReferencias and l.codigoLote = ?",
              [id],
              (err, result) => {
                if (err) {
                  con.end();
                  return this.res.status(400).json({ error: err.sqlMessage });
                }
                const { nombreProducto, identificacion } = JSON.parse(
                  JSON.stringify(result)
                )[0];

                con.query(
                  "INSERT INTO embalajes (idReferencia, idLote, udsPorCanastilla) VALUES (?, ?, 100)",
                  [identificacion, id],
                  (err, result) => {
                    if (err) {
                      con.end();
                      return this.res
                        .status(400)
                        .json({ error: err.sqlMessage });
                    }
                    // preparar el informe
                    con.query(
                      "SELECT udsDefCrudas + udsDefCortas + udsDefDeformes + udsDefQuemadas + udsDefAplastadas + udsDefPegadas + udsDefSucias as defectuosas FROM empaques WHERE idLote = ?",
                      [id],
                      (err, result) => {
                        con.end();
                        if (err) {
                          return this.res
                            .status(400)
                            .json({ error: err.sqlMessage });
                        }

                        const { defectuosas } = JSON.parse(
                          JSON.stringify(result)
                        )[0];
                        const informacion =
                          defectuosas === 0
                            ? "No hubo problemas durante el proceso"
                            : `Tuvimos ${defectuosas} unidades defectuosas`;
                        const estado =
                          defectuosas === 0 ? "success" : "warning";

                        return this.res.json({
                          message: {
                            nombreProducto,
                            idLote: id,
                            informacion,
                            estado,
                          },
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }
}

module.exports = Lots;
