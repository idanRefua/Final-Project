import Joi from "joi-browser";

const reviewSchema = {
  review: Joi.string().min(10).max(70).required().trim(),
};

export default reviewSchema;
