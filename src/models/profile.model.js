const bcrypt = require("bcryptjs");
const sequelize = require("../config/sequelize");
const { ROLES, GENDER } = require("../config/type");
const { DataTypes } = require("sequelize");

const Profile = sequelize.define("profiles", {
  accountId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.ENUM,
    values: [...Object.values(GENDER)],
  },
  rate: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
});

module.exports = Profile;
