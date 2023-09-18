const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const { authenticateAccount } = require("../services/auth.service");
const { generateAuthTokens } = require("../services/token.service");
const { authService, profileService } = require("../services");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

exports.signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const account = await authenticateAccount(email, password);
  const profile = await profileService.getProfileByAccountId(account.id);
  const tokens = await generateAuthTokens(account.id);
  res.json(
    new BaseResponse(httpStatus.OK, {
      account: { ...account, ...profile.get() },
      tokens,
    })
  );
});
exports.signOut = catchAsync(async (req, res) => {});

exports.refreshToken = catchAsync(async (req, res) => {
  if (!req.body.refreshToken || typeof req.body.refreshToken !== "string") {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }
  const tokens = await authService.refreshToken(req.body.refreshToken);
  res.send(new BaseResponse(httpStatus.OK, { ...tokens }, ""));
});

exports.forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  res.send(new BaseResponse(httpStatus.OK));
});

exports.resetPassword = catchAsync(async (req, res) => {
  console.log(req.body);
  await authService.resetPassword(req.body);
  res.send(new BaseResponse(httpStatus.OK));
});
