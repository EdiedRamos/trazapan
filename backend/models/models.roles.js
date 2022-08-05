const jwt = require("jsonwebtoken");

class Roles {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getPayload() {
    const { id: token } = this.req.params;
    if (!token) {
      return this.res.status(400).json({ message: "Se requiere el token" });
    }
    try {
      await jwt.verify(token, process.env.SECRET);
      const { nombre, cargo, cedula } = await jwt.decode(token);
      return this.res.json({
        datos: {
          nombre,
          cargo,
          cedula,
        },
      });
    } catch (exc) {
      return this.res.status(401).json({ message: "El token es inválido" });
    }
  }
}

module.exports = Roles;
