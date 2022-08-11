import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().email().min(5).max(250).trim().required(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
    )
    .required(),
};

export default loginSchema;
