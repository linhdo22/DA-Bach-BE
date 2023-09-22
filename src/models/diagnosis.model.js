const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Diagnosis = sequelize.define("diagnoses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING(500),
  },
});

module.exports = Diagnosis;
