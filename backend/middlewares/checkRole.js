const createError = require("./error");

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const role = req.role;

    if (!role || role !== requiredRole)
      return next(createError(403, "Vous n'etes pas autorisé"));

    next();
  };
};

module.exports = checkRole;
