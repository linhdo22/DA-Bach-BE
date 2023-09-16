const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const { authenticateAccount } = require("../services/auth.service");
const { generateAuthTokens } = require("../services/token.service");
const { authService } = require("../services");

exports.signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const account = await authenticateAccount(email, password);
  const tokens = await generateAuthTokens(account.id);
  res.json(new BaseResponse(200, { account, tokens }));
});
exports.signOut = catchAsync(async (req, res) => {});

exports.refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshToken(req.body.refreshToken);
  res.send(new BaseResponse(httpStatus.OK, { ...tokens }, ""));
});
