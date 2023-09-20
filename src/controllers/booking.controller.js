const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const sequelize = require("../config/sequelize");
const { bookingService, diagnosisService } = require("../services");
const { ROLES } = require("../config/type");
const DiagnosisDrug = require("../models/diagnosis-drug.model");
const { Drug } = require("../models");

exports.getBookingList = catchAsync(async (req, res) => {
  const user = req.user;
  const filter =
    user.role === ROLES.DOCTOR
      ? { doctorId: user.id }
      : { customerId: user.id };
  const data = await bookingService.getBookingList({ ...req.query, ...filter });
  res.json(new BaseResponse(httpStatus.OK, data));
});

exports.getBookingItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await bookingService.getBookingById(id);
  res.json(new BaseResponse(httpStatus.OK, data));
});

exports.updateBooking = catchAsync(async (req, res) => {
  const booking = req.body;
  const t = await sequelize.transaction();
  try {
    await bookingService.updateBooking(booking.id, booking, t);
    await t.commit();
    res.json(new BaseResponse(httpStatus.OK));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});

exports.finishBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const { drugs, ...diagnosisData } = req.body;
  const t = await sequelize.transaction();
  try {
    await bookingService.updateBooking(
      req.body.bookingId,
      { isFinished: true },
      t
    );
    const diagnosis = await diagnosisService.createDiagnosis(
      {
        ...diagnosisData,
        doctorId: user.id,
      },
      t
    );
    for (let i = 0; i < drugs.length; i++) {
      const drug = await Drug.findOne({ where: { id: drugs[i].id } });
      drug.stock -= Number(drugs[i].count);
      await drug.save({ transaction: t });
      await DiagnosisDrug.create(
        {
          drugId: drugs[i].id,
          count: drugs[i].count,
          diagnosisId: diagnosis.id,
        },
        { transaction: t }
      );
    }
    await t.commit();
    const data = await bookingService.getBookingById(req.body.bookingId);

    res.json(new BaseResponse(httpStatus.OK, data));
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw error;
  }
});
