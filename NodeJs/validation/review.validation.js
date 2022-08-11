const Joi = require("joi");

const reviewProductRoles = {
  byUser: Joi.string().hex().length(24).required(),
  review: Joi.string().min(10).max(70).required().trim(),
};

const reviewProductSchema = Joi.object(reviewProductRoles);

module.exports = {
  reviewProductSchema,
};
