const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (decoded.role === "admin") {
      return next();
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return res.status(401).send("Unauthorized");
};
