const httpStatus = require("http-status");
const { Diagnosis, Drug } = require("../models");
const ApiError = require("../utils/ApiError");

exports.createDiagnosis = async (data, transaction) => {
  const profile = await Diagnosis.create(data, {
    include: Drug,
    transaction,
    logging: true,
  });
  return profile;
};

exports.updateDiagnosis = async (id, data, transaction) => {
  return Diagnosis.update(data, { where: { id }, transaction });
};

exports.removeDiagnosis = async (id, transaction) => {
  return Diagnosis.destroy({
    where: { id },
    transaction,
  });
};
