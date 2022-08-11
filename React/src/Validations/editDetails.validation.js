import Joi from "joi-browser";

const editDetailsSchema = {
  email: Joi.string().email().min(5).max(250).trim().required(),
  firstname: Joi.string()
    .min(2)
    .max(250)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(250)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  phone: Joi.string()
    .min(7)
    .max(10)
    .regex(new RegExp("^[0-9]{9,10}$"))
    .required(),
};

export default editDetailsSchema;
