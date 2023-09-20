const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize");
const { profileService, accountService, authService } = require("../services");
const { getPaginateData } = require("../utils/paginate");
const ApiError = require("../utils/ApiError");

exports.getAccountList = catchAsync(async (req, res) => {
  const data = await accountService.getAccountList(req.query);
  res.json(new BaseResponse(httpStatus.OK, data));
});
exports.getAccountById = catchAsync(async (req, res) => {});
exports.createAccount = catchAsync(async (req, res) => {
  const { account, profile } = req.body;
  const t = await sequelize.transaction();
  try {
    const newAccount = await accountService.createAccount(account, t);
    await profileService.createProfile(
      { accountId: newAccount.id, ...profile },
      t
    );
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});
exports.updateAccount = catchAsync(async (req, res) => {
  const { account, profile } = req.body;
  const t = await sequelize.transaction();
  try {
    await accountService.updateAccount(account.id, account, t);
    await profileService.updateProfile(account.id, profile, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});

exports.removeAccount = catchAsync(async (req, res) => {
  const { accountId } = req.body;
  const t = await sequelize.transaction();
  try {
    await profileService.removeProfile(accountId, t);
    await accountService.removeAccount(accountId, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});

exports.changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const account = req.user;
  if (oldPassword == newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "password not changed");
  }
  if (!authService.isPasswordMatch(account.password, oldPassword)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "invalid password");
  }
  await accountService.updateAccount(account.id, { password: newPassword });
  res.json(new BaseResponse(httpStatus.OK));
});

exports.changeProfile = catchAsync(async (req, res) => {
  const profile = req.body;
  const account = req.user;
  await profileService.updateProfile(account.id, profile);
  res.json(new BaseResponse(httpStatus.OK, profile));
});
