const bcrypt = require("bcryptjs");
const sequelize = require("../config/sequelize");
const { ROLES } = require("../config/type");
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
  rate: {
    type: DataTypes.TINYINT,
    defaultValue: 5,
  },
});

module.exports = Profile;
