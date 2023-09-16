const Account = require("./account.model");
const Token = require("./token.model");
const Profile = require("./profile.model");

Profile.belongsTo(Account, { foreignKey: "accountId" });
Account.hasOne(Profile);

module.exports.Account = Account;
module.exports.Profile = Profile;
module.exports.Token = Token;
