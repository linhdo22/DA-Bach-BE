const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const auth = (roles) => (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, (err, account, info) => {
      if (err || info || !account) {
        reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
      }
      if (!roles.includes(account.role)) {
        reject(new ApiError(httpStatus.FORBIDDEN, "Permission denied"));
      }
      req.user = account;
      resolve();
    })(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
