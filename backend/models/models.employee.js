const mysql = require("../utils/database.js");
const bcrypt = require("bcrypt");

class Employee {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getAllEmployees() {
    const sql = "SELECT * FROM empleados WHERE activo='yes'";
    const con = mysql();
    con.query(sql, (err, result) => {
      con.end();
      if (err) {
        this.res.status(400).json({ message: err.sqlMessage });
      } else {
        this.res.send(JSON.parse(JSON.stringify(result)));
      }
    });
  }

  getEmployeeById() {
    const { id: cedula } = this.req.params;
    const con = mysql();
    con.query(
      "SELECT * FROM empleados WHERE cedula=?",
      [cedula],
      (err, result) => {
        con.end();
        if (err || !result.length) {
          return this.res.status(400).json({ error: "Consulta incorrecta" });
        }
        return this.res.json({ data: result[0] });
      }
    );
  }

  registerEmployee() {
    const required = [
      "cedula",
      "nombres",
      "apellidos",
      "nacimiento",
      "direccion",
      "correo",
      "sexo",
      "estado",
      "cargo",
      "salario",
      "contrasena",
    ];
    // check required data
    for (const key of required) {
      if (this.req.body[key] === undefined) {
        return this.res
          .status(400)
          .json({ message: "¡Por favor envie todos los datos!" });
      }
    }
    const {
      cedula,
      nombres,
      apellidos,
      nacimiento,
      direccion,
      correo,
      sexo,
      estado,
      cargo,
      salario,
      contrasena,
    } = this.req.body;
    const con = mysql();
    // check age
    const age = Math.abs(new Date() - new Date(nacimiento)) / 31536000000;
    if (age < 18)
      return this.res
        .status(400)
        .json({ error: "Fecha inválida: Menor de edad" });
    // check "cedula"
    con.query(
      "SELECT cedula FROM empleados WHERE cedula=?",
      [cedula],
      (err, result) => {
        let parser = null;
        try {
          parser = JSON.parse(JSON.stringify(result))[0];
        } catch (exc) {
          parser = true;
        }
        if (parser) {
          con.end();
          return this.res
            .status(400)
            .json({ error: "La cédula ya está en uso" });
        }
        // check email
        con.query(
          "SELECT correo FROM empleados WHERE correo=?",
          [correo],
          async (err, result) => {
            let parser = null;
            try {
              parser = JSON.parse(JSON.stringify(result))[0];
            } catch (exc) {
              parser = true;
            }
            if (parser) {
              con.end();
              return this.res
                .status(400)
                .json({ error: "El correo ya está en uso" });
            }
            // we can register the user
            const crypted = await bcrypt.hash(contrasena, 10);
            const sql = `INSERT INTO empleados (cedula, nombre, apellido, fechaNacimiento, direccion, correo, sexo, estado, cargo, salario, contrasena) VALUES ('${cedula}', '${nombres}', '${apellidos}', '${nacimiento}', '${direccion}', '${correo}', '${sexo}', '${estado}', '${cargo}', '${salario}', '${crypted}')`;
            con.query(sql, (err) => {
              con.end();
              if (err) {
                return this.res
                  .status(400)
                  .json({ error: "Error de registro" });
              } else {
                return this.res.json({ message: "Usuario registrado" });
              }
            });
          }
        );
      }
    );
  }

  updateEmployee() {
    const con = mysql();
    con.query(
      "SELECT correo FROM empleados WHERE correo=? AND cedula<>?",
      [this.req.body.correo, this.req.params.id],
      async (err, result) => {
        if (err) {
          con.end();
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        if (JSON.parse(JSON.stringify(result)).length) {
          con.end();
          return this.res.status(400).json({
            message: "El correo ya está en uso",
          });
        }
        const { id } = this.req.params;
        const canChange = [
          "direccion",
          "correo",
          "estado",
          "cargo",
          "salario",
          "contrasena",
        ];
        if (this.req.body.contrasena) {
          this.req.body.contrasena = await bcrypt.hash(
            this.req.body.contrasena,
            10
          );
        }
        let query = "UPDATE empleados SET";
        const values = [];
        let comma = false;
        for (const value of canChange) {
          if (
            this.req.body[value] &&
            this.req.body[value].toString().trim() !== ""
          ) {
            if (comma) query += ",";
            query += ` ${value}=?`;
            values.push(this.req.body[value]);
            comma = true;
          }
        }
        query += " WHERE cedula=?";
        values.push(id);
        con.query(query, values, (err, result) => {
          con.end();
          if (err) {
            return this.res.status(400).json({ error: err.sqlMessage });
          }
          return this.res.json({ message: "Actualización exitosa" });
        });
      }
    );
  }

  deleteEmployee() {
    const { id } = this.req.params;
    const con = mysql();
    con.query(
      "UPDATE empleados SET estado='inactivo', activo='no' WHERE cedula=?",
      [id],
      (err) => {
        con.end();
        if (err) {
          return this.res.status(400).json({ error: err.sqlMessage });
        }
        return this.res.json({ message: "Usuario Eliminado" });
      }
    );
  }
}

module.exports = Employee;
