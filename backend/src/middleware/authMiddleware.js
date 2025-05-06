const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret";

exports.authenticateJWT = (req, res, next) => {
  console.log("From authenticateJWT");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "From authenticateJWT: Invalid token" });
    req.user = user;
    next();
  });
};

exports.protectRoute = (req, res, next) => {
  console.log("From protectRoute");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.Status(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "From protectRoute: Invalid token" });
    req.user = user;
    next();
  });
};

exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied. Admins only." });
  }
  next();
};

exports.verifyAdmin = exports.requireAdmin;
