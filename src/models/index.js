const Account = require("./account.model");
const Token = require("./token.model");
const Profile = require("./profile.model");
const Drug = require("./drug.model");
const Booking = require("./booking.model");
const Diagnosis = require("./diagnosis.model");
const DiagnosisDrug = require("./diagnosis-drug.model");
const Rating = require("./rating.model");

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
Drug.belongsToMany(Diagnosis, { through: DiagnosisDrug });
Diagnosis.belongsToMany(Drug, { through: DiagnosisDrug });

// rating
Rating.belongsTo(Account, { foreignKey: "customerId", as: "customer" });
Rating.belongsTo(Account, { foreignKey: "doctorId", as: "doctor" });

module.exports.Drug = Drug;
module.exports.Account = Account;
module.exports.Profile = Profile;
module.exports.Token = Token;
module.exports.Booking = Booking;
module.exports.Diagnosis = Diagnosis;
module.exports.Rating = Rating;
