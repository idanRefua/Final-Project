import "./register-page.css";
import axios from "axios";
import Joi from "joi-browser";
import registerSchema from "../../Validations/register.validation";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailIsExist, setEmailIsExist] = useState("");
  const [dataFromServer, setDataFromServer] = useState(null);
  const history = useHistory();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  if (loggedInRedux) {
    history.push("/home");
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handlisAdmin = (e) => {
    setIsAdmin(e.target.checked);
  };

  const hadnleRegister = async (e) => {
    e.preventDefault();

    const validateUserRegister = Joi.validate(
      {
        email,
        password,
        firstname,
        lastname,
        phone,
        isAdmin,
      },
      registerSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validateUserRegister;
    if (error) {
      console.log({ error });
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      setEmailError(errors.email);
      if (errors.password) {
        setPasswordError(
          "Password must be with min 6 Charcaters,At least One Capital(uppercase) letter , One Number And One symbol(!@#$%)"
        );
      } else {
        setPasswordError("");
      }

      if (errors.firstname) {
        setFirstNameError(
          "Firstname must be with 2 minimum Charcters And First letter Uppercase[A-Z]"
        );
      } else {
        setFirstNameError("");
      }
      if (errors.lastname) {
        setLastNameError(
          "Lastname must be with 2 minimum Charcters And First letter Uppercase[A-Z]"
        );
      } else {
        setLastNameError("");
      }
      if (errors.phone) {
        setPhoneError("Phone must be number with at least 7 Charcters");
      } else {
        setPhoneError("");
      }
    } else {
      try {
        const responseFromServer = await axios.post("/auth/register", {
          email,
          password,
          firstname,
          lastname,
          phone,
          isAdmin,
        });
        setDataFromServer(responseFromServer.data);
        history.push("/login");
      } catch (error) {
        setEmailIsExist("This email is already used");
      }
    }
  };
  return (
    <div className="container ">
      <br />
      <div className="d-flex align-items-center justify-content-center">
        <form className="box-register-form " onSubmit={hadnleRegister}>
          <h1 className="register-title d-flex align-items-center justify-content-center">
            You can register for free!
          </h1>
          <br />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <br />
            <span className="validate-errors">{emailIsExist}</span>
            <span className="validate-errors">{emailError}</span>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <br />
            <span className="validate-errors">{passwordError}</span>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">
              First Name
            </label>
            <br />
            <span className="validate-errors">{firstnameError}</span>
            <input
              type="text"
              className="form-control"
              id="firstname"
              aria-describedby="emailHelp"
              value={firstname}
              onChange={handleFirstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <br />
            <span className="validate-errors">{lastnameError}</span>
            <input
              type="text"
              className="form-control"
              id="lastname"
              aria-describedby="emailHelp"
              value={lastname}
              onChange={handleLastName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <br />
            <span className="validate-errors">{phoneError}</span>
            <input
              type="phone"
              className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              value={phone}
              onChange={handlePhone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputInput" className="form-label">
              Bussines User? (Bussines Users Can Add Their products to our
              website)
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={isAdmin}
                onChange={handlisAdmin}
              />
              <label
                className="form-check-label admin-button-check"
                htmlFor="flexRadioDefault2"
              >
                Yes, I want to be Bussines User
              </label>
            </div>
          </div>
          <br />
          <p className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn  login-button">
              Register Now
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
