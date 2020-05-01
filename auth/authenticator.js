const secrets = require("../api/secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = secrets.jwtSecret;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Stop with the false tokens" });
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: "Access denied" });
  }
};
