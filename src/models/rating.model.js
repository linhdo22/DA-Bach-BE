const bcrypt = require("bcryptjs");
const sequelize = require("../config/sequelize");
const { ROLES } = require("../config/type");
const { DataTypes } = require("sequelize");

const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
  },
  doctorId: {
    type: DataTypes.INTEGER,
  },
  rate: {
    type: DataTypes.INTEGER,
    values: Object.values(ROLES),
  },
  feedback: {
    type: DataTypes.STRING(1000),
  },
});

module.exports = Rating;
