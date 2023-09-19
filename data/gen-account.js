const { faker } = require("@faker-js/faker");
const { ROLES } = require("../src/config/type");
const { accountService, profileService } = require("../src/services");

const genAccount = (role, index) => {
  return {
    email: `${role.toLowerCase()}${index}@yopmail.com`,
    password: "123123",
    role,
  };
};

const genProfile = (accountId) => {
  return {
    accountId,
    phone: faker.phone.number("09########"),
    name: faker.person.fullName(),
  };
};

exports.createAccount = async (role, index) => {
  const a = genAccount(role, index);
  const account = await accountService.createAccount(a);
  const p = genProfile(account.id);
  const profile = await profileService.createProfile({
    accountId: account.id,
    ...p,
  });
};
