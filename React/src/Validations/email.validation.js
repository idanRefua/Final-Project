import Joi from "joi-browser";

const emailSchema = {
  email: Joi.string().email().min(5).max(250).trim().required(),
};

export default emailSchema;
