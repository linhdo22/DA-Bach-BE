const httpStatus = require("http-status");
const { Booking, Profile, Account } = require("../models");
const ApiError = require("../utils/ApiError");
const { getPaginateData } = require("../utils/paginate");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");

exports.getBookingById = async (id) => {
  return Booking.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "doctor",
        attributes: [
          "id",
          "email",
          "role",
          [sequelize.literal("`doctor->profile`.`name`"), "name"],
          [sequelize.literal("`doctor->profile`.`phone`"), "phone"],
          [sequelize.literal("`doctor->profile`.`rate`"), "rate"],
        ],
        include: {
          model: Profile,
          attributes: [],
        },
      },
      {
        model: Account,
        as: "customer",
        attributes: [
          "id",
          "email",
          "role",
          [sequelize.literal("`customer->profile`.`name`"), "name"],
          [sequelize.literal("`customer->profile`.`phone`"), "phone"],
          [sequelize.literal("`customer->profile`.`rate`"), "rate"],
        ],
        include: {
          model: Profile,
          attributes: [],
        },
      },
    ],
  });
};

exports.getBookingList = async (query) => {
  const { doctorId, customerId } = query;
  const condition = {};
  if (doctorId) {
    condition.doctorId = doctorId;
  }
  if (customerId) {
    condition.customerId = customerId;
  }

  const data = await Booking.findAll({
    where: condition,
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "doctor",
        attributes: [
          "id",
          "email",
          "role",
          [sequelize.literal("`doctor->profile`.`name`"), "name"],
          [sequelize.literal("`doctor->profile`.`phone`"), "phone"],
          [sequelize.literal("`doctor->profile`.`rate`"), "rate"],
        ],
        include: {
          model: Profile,
          attributes: [],
        },
      },
      {
        model: Account,
        as: "customer",
        attributes: [
          "id",
          "email",
          "role",
          [sequelize.literal("`customer->profile`.`name`"), "name"],
          [sequelize.literal("`customer->profile`.`phone`"), "phone"],
          [sequelize.literal("`customer->profile`.`rate`"), "rate"],
        ],
        include: {
          model: Profile,
          attributes: [],
        },
      },
    ],
  });
  return data;
};

exports.updateBooking = async (bookingId, data, transaction) => {
  return Booking.update(data, { where: { id: bookingId }, transaction });
};
