import Joi from "joi-browser";
const productSchema = {
  title: Joi.string().min(2).max(50).required().trim(),
  shortinfo: Joi.string().min(10).max(70).required().trim(),
  image: Joi.string().min(10).max(255),
  description: Joi.string().min(20).max(400).required(),
  price: Joi.number().min(100).max(2000).required(),
  category: Joi.string().min(2).max(30).trim().required(),
};

export default productSchema;
