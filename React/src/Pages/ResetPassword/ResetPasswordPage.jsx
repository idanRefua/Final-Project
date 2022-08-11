import "./reset-password-page.css";
import { Fragment, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Joi from "joi-browser";
import resetPasswordSchema from "../../Validations/resetPassword.validation";
import jwt_decode from "jwt-decode";

const ResetPasswordPage = () => {
  const { id } = useParams();
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const decoded = jwt_decode(token);
    const date = new Date();
    if (decoded.exp < date.getTime() / 1000) {
      history.push("/*");
    } else {
      return;
    }
  }, [history, token]);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPassword2Error, setNewPassword2Error] = useState("");
  const [resetYourPassword, setResetYourPassword] = useState(false);
  const [errorResetPassword, setErrorResetPassword] = useState(false);

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleNewPassword2 = (e) => {
    setNewPassword2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatePassword = Joi.validate(
      { newPassword, newPassword2 },
      resetPasswordSchema,
      { abortEarly: false }
    );
    const { error } = validatePassword;
    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      setNewPasswordError(errors.newPassword);
      setNewPassword2Error(errors.newPassword2);
    } else {
      setNewPasswordError("");
      setNewPassword2Error("");
      axios
        .patch(`/auth/resetpassword/${id}/${token}`, {
          newPassword,
          newPassword2,
        })
        .then(() => {
          setErrorResetPassword(false);
          setResetYourPassword(true);
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        })
        .catch(() => {
          setErrorResetPassword(true);
        });
    }
  };
  return (
    <Fragment>
      <br />
      <br />
      <br />
      <div className="container d-flex align-items-center justify-content-center ">
        <form onSubmit={handleSubmit} className="reset-password-form">
          <h1 className="d-flex align-items-center justify-content-center reset-password-title">
            Reset Your Password
          </h1>
          <br />
          <br />
          <label className="d-flex align-items-center justify-content-center password-title">
            New Password
          </label>
          <span className="password-error">{newPasswordError}</span>
          <input
            className="form-control  d-flex align-items-center justify-content-center"
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
          />
          <br />
          <label className="d-flex align-items-center justify-content-center password-title">
            Verify New Password
          </label>
          <span className="password-error">{newPassword2Error}</span>
          <input
            className="form-control  d-flex align-items-center justify-content-center"
            type="password"
            value={newPassword2}
            onChange={handleNewPassword2}
          />
          <br />
          {errorResetPassword && (
            <span className="d-flex align-items-center justify-content-center failed-send">
              The Passwords are not Match !
            </span>
          )}
          {resetYourPassword && (
            <span className="d-flex align-items-center justify-content-center success-send">
              You Change your Password ! Moving to login page...
            </span>
          )}
          <br />
          <p className="d-flex align-items-center justify-content-center">
            <button className="reset-password-btn" type="submit">
              Change Password
            </button>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPasswordPage;
