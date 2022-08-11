import "./forget-password-page.css";
import Joi from "joi-browser";
import axios from "axios";
import { Fragment, useState } from "react";
import emailSchema from "../../Validations/email.validation";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [emailNotSend, setEmailNotSend] = useState(false);
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateEmail = Joi.validate({ email }, emailSchema, {
      abortEarly: false,
    });
    const { error } = validateEmail;

    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      setEmailError(errors.email);
    } else {
      axios
        .post("/auth/forgotpassword", { email })
        .then((res) => {
          setEmailSend(true);
          setEmailNotSend(false);
          setEmailError("");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        })
        .catch((err) => {
          setEmailError("");
          setEmailNotSend(true);
        });
    }
  };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <div className="container d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="forget-pass-form ">
          <h1 className=" d-flex align-items-center justify-content-center forget-pass-form-title">
            Forget your password ?
          </h1>
          <br />
          <br />
          <label className="d-flex align-items-center justify-content-center email-title">
            Email Address
          </label>
          <br />
          <span className="email-error">{emailError}</span>
          <input
            className="form-control  d-flex align-items-center justify-content-center"
            onChange={handleEmail}
            value={email}
            type="text"
          />
          <br />
          {emailSend === true && (
            <span className="d-flex align-items-center justify-content-center success-send">
              Email send Successfuly
            </span>
          )}
          {emailNotSend === true && (
            <span className="d-flex align-items-center justify-content-center failed-send">
              There is no user with this email !
            </span>
          )}
          <br />
          <p className="d-flex align-items-center justify-content-center">
            <button className="forget-pass-btn" type="submit">
              Send Link
            </button>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgetPasswordPage;
