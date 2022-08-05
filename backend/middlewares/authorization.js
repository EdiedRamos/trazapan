const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "No estás autorizado" });
    }
    const token = authorization.split(" ")[1];
    await jwt.verify(token, process.env.SECRET);
    next();
  } catch (exc) {
    return res.status(401).json({ error: "No estás autorizado" });
  }
};

module.exports = authorization;
