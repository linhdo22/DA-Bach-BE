const httpStatus = require("http-status");
const { Account, Profile } = require("../models");
const ApiError = require("../utils/ApiError");
const { getPaginateData } = require("../utils/paginate");

exports.createAccount = async ({ email, password, role }, transaction) => {
  const isExist = !!(await Account.findOne(
    { where: { email }, raw: true },
    { transaction }
  ));
  if (isExist) {
    throw new ApiError(400, "account exist");
  }
  const account = await Account.create(
    { email, password, role },
    { transaction }
  );
  return account;
};
exports.getAccountById = async () => {};
exports.getAccountByEmail = async (email) => {
  return Account.findOne({
    where: { email },
    attributes: { exclude: ["createAt", "updateAt"] },
    raw: true,
  });
};
exports.getAccountList = async (query) => {
  const { limit, page } = query;
  const numLimit = Number(limit);
  const numPage = Number(page);

  const data = await Account.findAndCountAll({
    limit: numLimit,
    offset: (numPage - 1) * numLimit,
    attributes: [
      "id",
      "email",
      "role",
      "createdAt",
      "profile.name",
      "profile.phone",
      "profile.rate",
    ],
    raw: true,
    include: {
      model: Profile,
      attributes: [],
    },
  });
  return getPaginateData(data, numPage, numLimit);
};
exports.updateAccount = async (accountId, data, transaction) => {
  return Account.update(data, { where: { id: accountId }, transaction });
};
exports.removeAccount = async (accountId, transaction) => {
  return Account.destroy({
    where: { id: accountId },
    transaction,
  });
};
