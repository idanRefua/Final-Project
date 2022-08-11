import Joi from "joi-browser";

const resetPasswordSchema = {
  newPassword: Joi.string().regex(
    new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
  ),
  newPassword2: Joi.string().regex(
    new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
  ),
};

export default resetPasswordSchema;
