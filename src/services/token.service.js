const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");
const { Token } = require("../models");
const { TOKEN_TYPE } = require("../config/type");
const ApiError = require("../utils/ApiError");

const generateJWTToken = (
  accountId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: accountId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    nonce: uuidv4(),
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token,
  accountId,
  expires,
  type,
  blacklisted = false
) => {
  return Token.create({
    accountId,
    token,
    expiredDate: expires.toDate(),
    type,
    blacklisted,
  });
};

const verifyJWTToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);

  const savedToken = await Token.findOne({
    where: {
      token,
      type,
      accountId: payload.sub,
      blacklisted: false,
    },
  });
  if (!savedToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "loi");
  }
  return savedToken;
};

const generateAuthTokens = async (accountId) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateJWTToken(
    accountId,
    accessTokenExpires,
    TOKEN_TYPE.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateJWTToken(
    accountId,
    refreshTokenExpires,
    TOKEN_TYPE.REFRESH
  );

  await saveToken(
    refreshToken,
    accountId,
    refreshTokenExpires,
    TOKEN_TYPE.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const decodeToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = {
  generateJWTToken,
  saveToken,
  verifyJWTToken,
  generateAuthTokens,
  decodeToken,
};
