const httpStatus = require("http-status");
const { Profile } = require("../models");
const ApiError = require("../utils/ApiError");

exports.createProfile = async (data, transaction) => {
  const profile = await Profile.create(data, { transaction, raw: true });
  return profile;
};
exports.getProfileById = async () => {};
exports.getProfileByEmail = async (email) => {
  return Profile.findOne({
    where: { email },
    attributes: { exclude: ["createAt", "updateAt"] },
  });
};
exports.getProfileList = async () => {};
exports.updateProfile = async (accountId, data, transaction) => {
  return Profile.update(data, { where: { accountId: accountId }, transaction });
};
exports.removeProfile = async (accountId, transaction) => {
  return Profile.destroy({
    where: { accountId },
    transaction,
  });
};
