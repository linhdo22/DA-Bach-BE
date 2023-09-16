const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const accountService = require("./account.service");
const { TOKEN_TYPE } = require("../config/type");
const { Token, Account } = require("../models");
const tokenService = require("./token.service");

const isPasswordMatch = (savedPassword, sentPassword) => {
  return bcrypt.compareSync(sentPassword, savedPassword);
};
exports.isPasswordMatch = isPasswordMatch;

exports.authenticateAccount = async (email, password) => {
  let account = null;
  account = await accountService.getAccountByEmail(email);
  if (!account || !isPasswordMatch(account.password, password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "loi");
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
  return tokenService.generateAuthTokens(account);
};
