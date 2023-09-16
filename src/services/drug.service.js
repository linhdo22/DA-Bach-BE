const httpStatus = require("http-status");
const { Drug } = require("../models");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const { getPaginateData } = require("../utils/paginate");

exports.createDrug = async (data, transaction) => {
  console.log(data);
  const profile = await Drug.create(data, { transaction, raw: true });
  return profile;
};
exports.getDrugList = async (query) => {
  const { limit, page, name } = query;
  const numLimit = Number(limit);
  const numPage = Number(page);
  const condition = {};
  if (name) {
    condition.name = {
      [Op.like]: `%${name}%`,
    };
  }

  const data = await Drug.findAndCountAll({
    limit: numLimit,
    offset: (numPage - 1) * numLimit,
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
    where: condition,
  });
  return getPaginateData(data, numPage, numLimit);
};
exports.searchDrug = async (searchText, limit = 20) => {
  const data = await Drug.findAll({
    limit: Number(limit),
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
    where: {
      name: {
        [Op.like]: `%${searchText}%`,
      },
    },
  });
  return data;
};
exports.updateDrug = async (id, data, transaction) => {
  return Drug.update(data, { where: { id }, transaction });
};
exports.removeDrug = async (id, transaction) => {
  return Drug.destroy({
    where: { id },
    transaction,
  });
};
