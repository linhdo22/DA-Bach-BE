const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  feEndPoint: process.env.FE_ENDPOINT,
  mysql: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes:
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    tokenNewAccountExpirationMinutes:
      process.env.JWT_TOKEN_NEW_ACCOUNT_EXPIRATION_MINUTES,
  },
  email: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
};
