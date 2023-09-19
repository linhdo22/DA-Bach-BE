const Account = require("./account.model");
const Token = require("./token.model");
const Profile = require("./profile.model");
const Drug = require("./drug.model");
const Booking = require("./booking.model");
const Diagnosis = require("./diagnosis.model");

// profile
Profile.belongsTo(Account, { foreignKey: "accountId" });
Account.hasOne(Profile);

// booking
Booking.belongsTo(Account, { foreignKey: "doctorId", as: "doctor" });
Booking.belongsTo(Account, { foreignKey: "customerId", as: "customer" });

// diagnosis
Diagnosis.belongsTo(Account, { foreignKey: "doctorId" });
Diagnosis.belongsTo(Account, { foreignKey: "customerId" });
Diagnosis.belongsTo(Booking, { foreignKey: "bookingId" });
Booking.hasOne(Diagnosis);

// drug
Drug.belongsToMany(Diagnosis, { through: "diagnosis_drug" });
Diagnosis.belongsToMany(Drug, { through: "diagnosis_drug" });

module.exports.Drug = Drug;
module.exports.Account = Account;
module.exports.Profile = Profile;
module.exports.Token = Token;
module.exports.Booking = Booking;
module.exports.Diagnosis = Diagnosis;
