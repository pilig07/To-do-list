//FUNCIÓN PARA QUE EXPRESS PUEDA VERIFICAR EL TOKEN CON LA PALABRA ENCRIPTADA

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ status: "error", message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Token inválido" });
  }
}

module.exports = verifyToken;
