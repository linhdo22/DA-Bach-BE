const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const auth = (roles) => async (req, res, next) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err, account, info) => {
        if (err || info || !account) {
          throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
        }
        if (!roles.includes(account.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, "Permission denied");
        }
        req.account = account;
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
