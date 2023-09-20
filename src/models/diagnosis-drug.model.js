const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const DiagnosisDrug = sequelize.define(
  "diagnosis_drug",
  {
    count: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = DiagnosisDrug;
