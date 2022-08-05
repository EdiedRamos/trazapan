const mysql = require("../utils/database.js");

class Packaging {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  registerPackage() {
    const con = mysql();
    const {
      idLote,
      temperatura,
      torresCanastillas,
      canastasSueltas,
      crudas,
      cortas,
      deformes,
      quemadas,
      aplastadas,
      pegadas,
      sucias,
    } = this.req.body;
    con.query(
      "SELECT idMaquina FROM formadocrecimiento WHERE idLote = ?",
      [idLote],
      (err, result) => {
        if (err) {
          con.end();
          return this.res.json({ error: err.sqlMessage });
        }
        const ans = JSON.parse(JSON.stringify(result));
        if (ans.length === 0) {
          con.end();
          return this.res.status(400).json({
            error: `El lote ${idLote} no ha pasado por la fase de Formado`,
          });
        }
        con.query(
          "SELECT * FROM empaques WHERE idLote = ?",
          [idLote],
          (err, result) => {
            if (err) {
              con.end();
              return this.res.json({ error: err.sqlMessage });
            }
            const verificado = JSON.parse(JSON.stringify(result));
            if (verificado.length > 0) {
              con.end();
              return this.res
                .status(400)
                .json({ error: `El lote ${idLote} ya fue registrado` });
            }
            con.query(
              "SELECT estado FROM maquinarias WHERE codigo = ?",
              [ans[0].idMaquina],
              (err, result) => {
                if (err) {
                  con.end();
                  return this.res.status(400).json({ error: err.sqlMessage });
                }
                const { estado } = JSON.parse(JSON.stringify(result))[0];
                con.query(
                  "INSERT INTO empaques (idLote, idMaquina, temperatura, torresCanastillas, canastas, udsDefCrudas, udsDefCortas, udsDefDeformes, udsDefQuemadas, udsDefAplastadas, udsDefPegadas, udsDefSucias, estadoMaquina) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                  [
                    idLote,
                    ans[0].idMaquina,
                    temperatura,
                    torresCanastillas,
                    canastasSueltas,
                    crudas,
                    cortas,
                    deformes,
                    quemadas,
                    aplastadas,
                    pegadas,
                    sucias,
                    estado,
                  ],
                  (err, result) => {
                    con.end();
                    if (err) {
                      return this.res.json({ error: err.sqlMessage });
                    }
                    return this.res.json({ message: "Formulario registrado" });
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

module.exports = Packaging;
