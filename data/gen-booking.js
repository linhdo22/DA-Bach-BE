const { faker } = require("@faker-js/faker");
const moment = require("moment");
const Booking = require("../src/models/booking.model");

const randomHour = () => {
  return Math.random() * (16 - 8) + 8;
};

const genBooking = (doctorId, customerId) => {
  const startTime = moment(
    faker.date.between({
      from: moment().subtract(7, "days"),
      to: moment().add(14, "days"),
    })
  );
  startTime.set("hour", randomHour());
  startTime.startOf("hour");
  const endTime = moment(startTime);
  endTime.add(1, "hour");

  return {
    doctorId,
    customerId,
    start: startTime,
    end: endTime,
  };
};

exports.createBooking = async (doctorId, customerId) => {
  const b = genBooking(doctorId, customerId);
  const book = await Booking.create(b);
};
