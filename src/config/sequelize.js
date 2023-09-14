const { Sequelize } = require('sequelize');
const { mysql } = require('./config');

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql',
});

module.exports = sequelize;