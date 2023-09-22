const { faker } = require("@faker-js/faker");
const { ROLES, GENDER } = require("../src/config/type");
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
    gender: Math.random() > 0.5 ? GENDER.MALE : GENDER.FEMALE,
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65 }),
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
