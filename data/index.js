const sequelize = require("../src/config/sequelize");
const { ROLES } = require("../src/config/type");
const { createAccount } = require("./gen-account");
const { createBooking } = require("./gen-booking");
const { createDrug } = require("./gen-drug");
const fs = require("fs").promises;

async function loadFile() {
  const data = await fs.readFile("data/drugs.csv", "utf-8");
  return data.split("\n");
}

const genData = async () => {
  await sequelize.sync({ alter: true, force: true });

  // admin
  // 1-2
  for (let i = 1; i <= 2; i++) {
    await createAccount(ROLES.ADMIN, i);
  }

  // doctor
  // 3-12
  for (let i = 1; i <= 10; i++) {
    await createAccount(ROLES.DOCTOR, i);
  }

  // customer
  // 13-42
  for (let i = 1; i <= 30; i++) {
    await createAccount(ROLES.CUSTOMER, i);
  }

  //booking
  for (let i = 3; i <= 7; i++) {
    for (let j = 0; j < 10; j++) {
      await createBooking(i, Math.round(Math.random() * (42 - 13) + 13));
    }
  }

  // drug
  const drugs = await loadFile();
  for (let i = 0; i < (await drugs).length; i++) {
    await createDrug(drugs[i]);
  }
  console.log("done");
  sequelize.close();
};

genData();
