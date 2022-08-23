const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../utils/database.js");

class Login {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  toLogin() {
    const con = mysql();
    const { cedula, contrasena } = this.req.body;
    con.query(
      "SELECT nombre, estado, cedula, contrasena, cargo FROM empleados WHERE cedula=?",
      [cedula],
      async (err, result) => {
        con.end();
        if (err)
          return this.res.status(400).json({
            message: "Consulta incorrecta",
          });
        const queryResult = JSON.parse(JSON.stringify(result));
        // console.log(queryResult);
        if (queryResult.length === 0) {
          return this.res
            .status(400)
            .json({ message: "Usuario no encontrado" });
        }
        let same;
        try {
          same = await bcrypt.compare(contrasena, queryResult[0].contrasena);
        } catch (exc) {
          return this.res.status(400).json({ message: "Contraseña requerida" });
        }
        if (!same) {
          return this.res
            .status(401)
            .json({ message: "Contraseña incorrecta" });
        }
        const { nombre, cargo, cedula, estado } = queryResult[0];
        if (estado !== "activo") {
          return this.res
            .status(401)
            .json({ message: `${nombre} su estado es INACTIVO` });
        }
        const token = jwt.sign(
          {
            nombre,
            cargo,
            cedula,
          },
          process.env.SECRET
        );
        this.res.send({
          datos: {
            nombre: nombre,
            cargo: cargo,
            cedula,
            token,
          },
        });
      }
    );
  }
}

module.exports = Login;
