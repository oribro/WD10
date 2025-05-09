require("dotenv").config(); // !!! <---- add JWT_SECRET in .env (see below code)
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  //     --- Dont forget to add JWT_SECRET in .env ---
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
