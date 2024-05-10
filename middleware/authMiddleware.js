// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized token" });
  }
}

module.exports = authMiddleware;