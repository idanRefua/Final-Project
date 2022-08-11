const Joi = require("joi");

const productRoles = {
  title: Joi.string().min(2).max(50).trim().required(),
  image: Joi.string().min(10).max(255),
  shortinfo: Joi.string().min(10).max(70).required().trim(),
  description: Joi.string().min(20).max(400).required(),
  price: Joi.number().required(),
  category: Joi.string().min(2).max(30).trim().required(),
  createdBy: Joi.string().hex().length(24).required(),
};
const editProductRoles = {
  title: Joi.string().min(2).max(50).trim().required(),
  image: Joi.string().min(10).max(255),
  shortinfo: Joi.string().min(10).max(70).required().trim(),
  description: Joi.string().min(20).max(400).required(),
  price: Joi.number().required(),
  category: Joi.string().min(2).max(30).trim().required(),
};

const productSchema = Joi.object(productRoles);
const editProductSchema = Joi.object(editProductRoles);

module.exports = {
  productSchema,
  editProductSchema,
};
