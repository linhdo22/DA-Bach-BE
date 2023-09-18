const httpStatus = require("http-status");
const { Profile } = require("../models");
const ApiError = require("../utils/ApiError");

exports.createProfile = async (data, transaction) => {
  const profile = await Profile.create(data, { transaction, raw: true });
  return profile;
};
exports.getProfileByAccountId = async (accountId) => {
  return Profile.findOne({
    where: { accountId },
    attributes: { exclude: ["createAt", "updateAt"] },
  });
};

exports.updateProfile = async (accountId, data, transaction) => {
  return Profile.update(data, { where: { accountId }, transaction });
};
exports.removeProfile = async (accountId, transaction) => {
  return Profile.destroy({
    where: { accountId },
    transaction,
  });
};
