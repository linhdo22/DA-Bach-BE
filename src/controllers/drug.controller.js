const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const sequelize = require("../config/sequelize");
const { drugService } = require("../services");

exports.getDrugList = catchAsync(async (req, res) => {
  const data = await drugService.getDrugList(req.query);
  res.json(new BaseResponse(httpStatus.OK, data));
});

exports.searchDrug = catchAsync(async (req, res) => {
  const { name, limit } = req.query;
  const data = await drugService.searchDrug(name, limit);
  res.json(new BaseResponse(httpStatus.OK, data));
});

exports.createDrug = catchAsync(async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await drugService.createDrug(req.body, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});

exports.updateDrug = catchAsync(async (req, res) => {
  const drug = req.body;
  const t = await sequelize.transaction();
  try {
    await drugService.updateDrug(drug.id, drug, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});

exports.removeDrug = catchAsync(async (req, res) => {
  const { id } = req.body;
  const t = await sequelize.transaction();
  try {
    await drugService.removeDrug(id, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});
