const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  start: {
    type: DataTypes.DATE,
  },
  end: {
    type: DataTypes.DATE,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Booking;
