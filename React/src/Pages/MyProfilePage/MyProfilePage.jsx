import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./my-profile-page.css";
import Joi from "joi-browser";
import editDetailsSchema from "../../Validations/editDetails.validation";
import editPasswordSchema from "../../Validations/changePassword.validation";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const MyProfilePage = () => {
  const [userFromData, setUserFromData] = useState(null);
  const [editPdetails, setEditPdetails] = useState(false);
  const [editPasswordForm, setEditPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [currentPassowrdError, setCurrentPasswordError] = useState("");
  const [newPassword1Error, setNewPassword1Error] = useState("");
  const [newPassword2Error, setNewPassword2Error] = useState("");
  const [completeChangePassword, setCompleteChangePassword] = useState("");
  const [changePassworFailed, setChangePassowrdChange] = useState("");
  const [firstNameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cantSendUserUpdates, setCantSendUserUpdates] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleName = (e) => {
    setUserFromData({ ...userFromData, firstname: e.target.value });
  };
  const handleLastName = (e) => {
    setUserFromData({ ...userFromData, lastname: e.target.value });
  };
  const handleEmail = (e) => {
    setUserFromData({ ...userFromData, email: e.target.value });
  };

  const handlePhone = (e) => {
    setUserFromData({ ...userFromData, phone: e.target.value });
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPassword2 = (e) => {
    setNewPassword2(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/auth/mydetails")
      .then((res) => {
        setUserFromData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const editDetails = () => {
    setEditPdetails(true);
  };
  const sendUpdateDetails = (e) => {
    e.preventDefault();
    let userUpdates = { ...userFromData };
    const validateEditDetails = Joi.validate(
      {
        email: userFromData.email,
        firstname: userFromData.firstname,
        lastname: userFromData.lastname,
        phone: userFromData.phone,
      },
      editDetailsSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validateEditDetails;

    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      setEmailError(errors.email);
      if (errors.firstname) {
        setFirstnameError(
          "Firstname must be with 2 minimum Charcters And First letter Uppercase[A-Z]"
        );
      } else {
        setFirstnameError("");
      }
      if (errors.lastname) {
        setLastnameError(
          "Lastname must be with 2 minimum Charcters And First letter Uppercase[A-Z]"
        );
      } else {
        setLastnameError("");
      }
      if (errors.phone) {
        setPhoneError("Phone must be number with at least 7 Charcters");
      } else {
        setPhoneError("");
      }
    } else {
      axios
        .patch(`/auth/edituserdetails/${userFromData._id}`, {
          email: userUpdates.email,
          firstname: userUpdates.firstname,
          lastname: userUpdates.lastname,
          phone: userUpdates.phone,
        })
        .then((res) => {
          setTimeout(() => {
            dispatch(authActions.logout());
            localStorage.clear();
            history.push("/login");
          }, 2000);
          setEditPdetails(false);
          setEmailError("");
          setFirstnameError("");
          setLastnameError("");
          setPhoneError("");
        })
        .catch((err) =>
          setCantSendUserUpdates(
            `Can't Update User - Maybe Problem With The Server, Please Try again Later...`
          )
        );
    }
  };

  const changePassword = () => {
    const validateEditPassword = Joi.validate(
      { currentPassword, newPassword, newPassword2 },
      editPasswordSchema,
      { abortEarly: false }
    );
    const { error } = validateEditPassword;

    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      if (errors.currentPassword) {
        setCurrentPasswordError(
          "Password must be with min 6 Charcaters,At least One Capital(uppercase) letter , One Number And One symbol(!@#$%)"
        );
      } else {
        setCurrentPasswordError("");
      }

      if (errors.newPassword) {
        setNewPassword1Error(
          "Password must be with min 6 Charcaters,At least One Capital(uppercase) letter , One Number And One symbol(!@#$%)"
        );
      } else {
        setNewPassword1Error("");
      }

      if (errors.newPassword2) {
        setNewPassword2Error(
          "Password must be with min 6 Charcaters,At least One Capital(uppercase) letter , One Number And One symbol(!@#$%)"
        );
      } else {
        setNewPassword2Error("");
      }
    } else {
      axios
        .patch(`/auth/changepass/${userFromData._id}`, {
          currentPassword,
          newPassword,
          newPassword2,
        })
        .then(() => {
          setCurrentPasswordError("");
          setNewPassword1Error("");
          setNewPassword2Error("");
          setCompleteChangePassword("Your Passowrd has been Changed!");
          setChangePassowrdChange("");

          setTimeout(() => {
            setEditPasswordForm(false);
          }, 2000);
        })
        .catch(() =>
          setChangePassowrdChange(
            "Your New Password fileds are not Match or Your current password is wrong"
          )
        );
    }
  };

  return (
    <div className="container">
      <br />
      <h1 className="d-flex align-items-center justify-content-center my-profile-title">
        My Profile Page
      </h1>
      <br />
      <div className="row">
        <div className="col">
          <div className="row">
            {userFromData !== null && (
              <div className="user-info">
                {!editPdetails && (
                  <Fragment>
                    <div className="change-my-profile-details">
                      <h2 className="d-flex align-items-center justify-content-center info-title">
                        Your Information
                      </h2>
                      <br />
                      <h5>Name: {userFromData.firstname || ""}</h5>

                      <h5>Last Name: {userFromData.lastname || ""}</h5>

                      <h5>Email: {userFromData.email || ""}</h5>

                      <h5>
                        Phone:
                        {userFromData.phone
                          ? userFromData.phone
                          : "No phone yet"}
                      </h5>
                      <br />
                      <div className="after-change-profile-span-message">
                        For update successfuly - After edit you will be log out!
                      </div>
                      <br />
                      <br />
                      <button onClick={editDetails}>Edit Details</button>
                    </div>
                  </Fragment>
                )}
                {editPdetails && (
                  <div className="edit-my-profile">
                    <h2 className="d-flex align-items-center justify-content-center info-title">
                      Your Information
                    </h2>
                    <br />
                    <span className="validate-errors">{firstNameError}</span>
                    <h5>
                      Name:
                      <input
                        type="text"
                        onChange={handleName}
                        value={userFromData.firstname || ""}
                      />
                    </h5>
                    <span className="validate-errors">{lastnameError}</span>
                    <h5>
                      Last Name:
                      <input
                        type="text"
                        onChange={handleLastName}
                        value={userFromData.lastname || ""}
                      />
                    </h5>
                    <span className="validate-errors">{emailError}</span>
                    <h5>
                      Email:
                      <input
                        type="text"
                        onChange={handleEmail}
                        value={userFromData.email || ""}
                      />
                    </h5>
                    <span className="validate-errors">{phoneError}</span>
                    <h5>
                      Phone:
                      <input
                        type="text"
                        onChange={handlePhone}
                        value={userFromData.phone || ""}
                      />
                    </h5>
                    <br />
                    <span className="error-server">{cantSendUserUpdates}</span>
                    <button type="submit" onClick={sendUpdateDetails}>
                      Update Details
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          {!editPasswordForm && (
            <button
              className="btn btn-info"
              onClick={() => {
                setEditPasswordForm(true);
              }}
            >
              Change Password
            </button>
          )}
          {editPasswordForm && (
            <Fragment>
              <div className="change-passowrd-box">
                <span className="validate-errors">{currentPassowrdError}</span>
                <h5>
                  Current Password :
                  <input
                    type="password"
                    onChange={handleCurrentPassword}
                    value={currentPassword}
                    className="form-control"
                  />
                </h5>
                <span className="validate-errors">{newPassword1Error}</span>
                <h5>
                  New Password :
                  <input
                    type="password"
                    onChange={handleNewPassword}
                    value={newPassword}
                    className="form-control"
                  />
                </h5>
                <span className="validate-errors">{newPassword2Error}</span>
                <h5>
                  Verify New Password :
                  <input
                    type="password"
                    onChange={handleNewPassword2}
                    value={newPassword2}
                    className="form-control"
                  />
                </h5>

                <br />
                <span className="validate-errors">{changePassworFailed}</span>
                <span className="channge-password">
                  {completeChangePassword}
                </span>
                <br />
                <button type="submit" onClick={changePassword}>
                  Change Password
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
