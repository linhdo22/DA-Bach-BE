const app = require("./app");
const config = require("./config/config");
const sequelize = require("./config/sequelize");

let server;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to mysql");
    server = app.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to mysql:", error);
  });

// Luc nao dev tren local thi chon option va bo comment
// sequelize.sync({ alter: true });
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true, force: true });
