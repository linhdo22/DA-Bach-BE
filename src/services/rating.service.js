const { Rating } = require("../models");

exports.createRating = async (data, transaction) => {
  return Rating.create(data, {
    transaction,
  });
};
