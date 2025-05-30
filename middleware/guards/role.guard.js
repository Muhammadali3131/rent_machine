const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwtService = require("../../services/jwt.service");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log(requiredRoles);
      console.log(req.user.roles);
      const userRoles = req.user.roles.map((role) => role.name);
      const hasRole = requiredRoles.some((reqRole) =>
        userRoles.includes(reqRole)
      );
      if (!hasRole) {
        return sendErrorResponse(
          { message: "Sizga ruxsat berilmagan" },
          res,
          403
        );
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
