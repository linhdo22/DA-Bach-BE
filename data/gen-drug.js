const { faker } = require("@faker-js/faker");
const moment = require("moment");
const { Drug } = require("../src/models");

const genDrug = (name) => {
  return {
    name,
    description: faker.lorem.text(),
    stock: faker.number.int({ min: 0, max: 100 }),
  };
};

exports.createDrug = async (name) => {
  const b = genDrug(name);
  await Drug.create(b);
};
