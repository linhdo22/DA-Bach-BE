const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize");
const { profileService, accountService } = require("../services");
const { getPaginateData } = require("../utils/paginate");

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
  console.log(req.body);
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
