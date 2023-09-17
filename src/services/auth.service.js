const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const accountService = require("./account.service");
const { TOKEN_TYPE } = require("../config/type");
const { Token, Account } = require("../models");
const tokenService = require("./token.service");
const { emailService } = require("../config/mail");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const moment = require("moment");

const isPasswordMatch = (savedPassword, sentPassword) => {
  return bcrypt.compareSync(sentPassword, savedPassword);
};
exports.isPasswordMatch = isPasswordMatch;

exports.authenticateAccount = async (email, password) => {
  let account = null;
  account = await accountService.getAccountByEmail(email);
  if (!account || !isPasswordMatch(account.password, password)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "invalid");
  }
  delete account.password;
  return account;
};

exports.signOut = async (refreshToken) => {
  const savedToken = await Token.findOne({
    where: {
      token: refreshToken,
      type: TOKEN_TYPE.REFRESH,
    },
  });
  if (!savedToken) {
    throw new ApiError(httpStatus.NOT_FOUND, "loi");
  }
  await savedToken.destroy();
};

exports.refreshToken = async (rfToken) => {
  const savedRefreshToken = await tokenService.verifyJWTToken(
    rfToken,
    TOKEN_TYPE.REFRESH
  );
  const account = await accountService.getAccountById(
    savedRefreshToken.accountId
  );
  if (!account) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "loi");
  }
  await savedRefreshToken.destroy();
  return tokenService.generateAuthTokens(account.id);
};

exports.forgotPassword = async (email) => {
  const account = await accountService.getAccountByEmail(email);
  if (!account) {
    throw new ApiError(httpStatus.BAD_REQUEST, "loi");
  }

  const resetPasswordExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const resetPasswordToken = tokenService.generateJWTToken(
    account.id,
    resetPasswordExpires,
    TOKEN_TYPE.RESET
  );

  await emailService.sendMail({
    subject: "Reset password",
    to: email,
    text: `Link reset: ${config.feEndPoint}/reset-password?email=${email}&token=${resetPasswordToken}`,
  });
};

exports.resetPassword = async ({ email, token, password }) => {
  const account = await accountService.getAccountByEmail(email);
  const payload = jwt.verify(token, config.jwt.secret);
  if (!account) {
    throw new ApiError(httpStatus.BAD_REQUEST);
  }
  return Account.update({ password }, { where: { id: account.id } });
};
