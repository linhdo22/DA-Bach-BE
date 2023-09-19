const catchAsync = require("../utils/catchAsync");
const { BaseResponse } = require("../utils/BaseResponse");
const httpStatus = require("http-status");
const sequelize = require("../config/sequelize");
const { bookingService } = require("../services");
const { ROLES } = require("../config/type");

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
