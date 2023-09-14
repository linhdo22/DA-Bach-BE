const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { TOKEN_TYPE } = require("../config/type");

const Token = sequelize.define("tokens", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
    values: Object.values(TOKEN_TYPE),
    defaultValue: TOKEN_TYPE.REFRESH,
  },
  expiredDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Token;
