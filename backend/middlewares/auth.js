const jwt = require("jsonwebtoken");
const ENV = require("../config");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  // Check if token is present in the request
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "Vous n'etes pas authoriser"));

  // verify token
  jwt.verify(token, ENV.TOKEN, (err, user) => {
    if (err) return next(createError(403, "Token invalide"));

    req.user = user;

    next();
  });
};

module.exports = verifyToken;
