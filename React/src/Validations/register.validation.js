import Joi from "joi-browser";

const registerSchema = {
  email: Joi.string().email().min(5).max(250).trim().required(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
    )
    .required(),
  firstname: Joi.string()
    .min(2)
    .max(250)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required()
    .label("Firstname"),
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
  isAdmin: Joi.boolean().required(),
};

export default registerSchema;
