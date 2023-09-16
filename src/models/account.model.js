const bcrypt = require("bcryptjs");
const sequelize = require("../config/sequelize");
const { ROLES } = require("../config/type");
const { DataTypes } = require("sequelize");

const Account = sequelize.define("accounts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    index: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcrypt.hashSync(value, 8));
    },
  },
  role: {
    type: DataTypes.STRING,
    values: Object.values(ROLES),
  },
});

module.exports = Account;
