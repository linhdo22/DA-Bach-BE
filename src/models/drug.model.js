const bcrypt = require("bcryptjs");
const sequelize = require("../config/sequelize");
const { ROLES } = require("../config/type");
const { DataTypes } = require("sequelize");

const Drug = sequelize.define("drugs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    index: true,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Drug;
