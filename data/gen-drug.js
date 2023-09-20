const { faker } = require("@faker-js/faker");
const moment = require("moment");
const { Drug } = require("../src/models");

const genDrug = () => {
  return {
    name: faker.word.noun(),
    description: faker.lorem.text(),
    stock: faker.number.int({ min: 0, max: 100 }),
  };
};

exports.createDrug = async () => {
  const b = genDrug();
  await Drug.create(b);
};
