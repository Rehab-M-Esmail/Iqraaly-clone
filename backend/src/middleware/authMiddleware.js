const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret";

function authenticateJWT(req, res, next) {
  console.log("From authenticateJWT in middleware");
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "From authenticateJWT: Invalid token" });
    req.user = user;
    next();
  });
}

function protectRoute(req, res, next) {
  console.log("From protectRoute", SECRET_KEY);
  const token = req.headers.authorization;
  console.log("Token in protectRoute:", token);
  if (!token) return res.status(401).json({ message: "No token provided" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "From protectRoute: Invalid token" });
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  console.log("From requireAdmin");
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied. Admins only." });
  }
  next();
}
// exports.verifyAdmin = exports.requireAdmin;
// exports.authenticateJWT = authenticateJWT;
module.exports = {
  authenticateJWT: authenticateJWT,
  protectRoute,
  requireAdmin: requireAdmin,
};
