const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const sequelize = require("../config/sequelize");
const {
  ratingService,
  accountService,
  profileService,
} = require("../services");
const { Rating, Account, Profile } = require("../models");

exports.getRatingList = catchAsync(async (req, res) => {
  const data = await Rating.findAll({
    where: req.query,
    include: [
      {
        model: Account,
        as: "customer",
        attributes: [
          "id",
          "email",
          "role",
          [sequelize.literal("`customer->profile`.`name`"), "name"],
          [sequelize.literal("`customer->profile`.`phone`"), "phone"],
        ],
        include: {
          model: Profile,
          attributes: [],
        },
      },
    ],
  });
  res.json(new BaseResponse(httpStatus.OK, data));
});

exports.checkRated = catchAsync(async (req, res) => {
  const data = await Rating.findOne({ where: req.query, raw: true });
  res.json(new BaseResponse(httpStatus.OK, !!data));
});

exports.createRating = catchAsync(async (req, res) => {
  const { doctorId, rate } = req.body;
  const t = await sequelize.transaction();
  try {
    await ratingService.createRating(req.body, t);
    const ratings = await Rating.findAll({
      where: { doctorId },
      attributes: ["rate"],
      raw: true,
    });
    const totalRate = ratings.reduce((total, r) => total + Number(r.rating), 0);
    const result = await profileService.updateProfile(doctorId, {
      rate: Math.round(
        (((totalRate + rate) / (ratings.length + 1)) * 100) / 100
      ),
    });
    console.log(result);
    console.log(
      Math.round((((totalRate + rate) / (ratings.length + 1)) * 100) / 100)
    );
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});
