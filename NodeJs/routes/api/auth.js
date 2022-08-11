const express = require("express");
const router = express.Router();
const jwt = require("../../config/jwt");
const bcrypt = require("../../config/bcrypt");
const usersMoudle = require("../../models/users.model");
const usersValidation = require("../../validation/user.validation");
const authMiddleWare = require("../../middleware/auth.middleware");

const nodemailer = require("../../util/sendEmail");

router.post("/register", async (req, res) => {
  try {
    const validateUser = await usersValidation.registerSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    const users = await usersMoudle.selectUserByEmail(validateUser.email);

    if (users.length === 0) {
      const hashPassword = await bcrypt.createPassword(validateUser.password);
      const newUser = await usersMoudle.addUser(
        validateUser.email,
        hashPassword,
        validateUser.firstname,
        validateUser.lastname,
        validateUser.isAdmin,
        validateUser.phone
      );

      res.json({ msg: "User created !" });
    } else {
      throw "that email  already exist ";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "can't regitser to our website right now, please try again later",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validateUser = await usersValidation.loginSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const users = await usersMoudle.selectUserByEmail(validateUser.email);

    if (users.length > 0) {
      const hashUser = await bcrypt.comparePassword(
        validateUser.password,
        users[0].password
      );

      if (hashUser) {
        const token = await jwt.generateToken({
          _id: users[0]._id,
          email: users[0].email,
          firstname: users[0].firstname,
          lastname: users[0].lastname,
          isAdmin: users[0].isAdmin,
        });

        res.json({ token });
      } else {
        throw "email or password incorrect !";
      }
    } else {
      throw "email or password incorrect !";
    }
  } catch (error) {
    res.status(400).json({
      error: "Can't login to the website right now , try again later",
    });
  }
});

router.patch("/edituserdetails/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const validateEdit = await usersValidation.editDetailsSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const users = await usersMoudle.selectUserByEmail(validateEdit.email);
    const userDetails = await usersMoudle.myDetails(userId);

    if (userDetails.email === validateEdit.email || users.length === 0) {
      const updateUser = await usersMoudle.editUserDetail(
        userId,
        validateEdit.email,
        validateEdit.firstname,
        validateEdit.lastname,
        validateEdit.phone
      );
      res.status(200).send(updateUser);
    } else {
      throw "Email as already exist";
    }
  } catch (error) {
    res.status(400).send({ error: "can't edit your profile, try again later" });
  }
});

router.get("/mydetails", authMiddleWare, async (req, res) => {
  try {
    const id = req.userData._id;

    const userInfo = await usersMoudle.myDetails(id);
    res.status(200).json(userInfo);
  } catch (error) {
    res
      .status(400)
      .json({ error: "get get your information please try again later" });
  }
});

router.patch("/changepass/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const validateEditPassword =
      await usersValidation.changePasswordSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    const user = await usersMoudle.myDetails(userId);

    const userPassword = await bcrypt.comparePassword(
      validateEditPassword.currentPassword,
      user.password
    );
    if (userPassword) {
      if (
        validateEditPassword.newPassword === validateEditPassword.newPassword2
      ) {
        const hashPassword = await bcrypt.createPassword(
          validateEditPassword.newPassword2
        );
        const updatePassword = await usersMoudle.editPassword(
          userId,
          hashPassword
        );
        res.status(200).send("Your Password Change !");
      } else {
        throw "The two password don't Match !";
      }
    } else {
      throw "The password is inccorect !";
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: "there is problem , please try again later" });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const valdiateEmail = await usersValidation.emailSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const users = await usersMoudle.selectUserByEmail(valdiateEmail.email);

    if (users.length > 0) {
      const token = await jwt.generateTokenForResetPassword({
        _id: users[0]._id,
        firstname: users[0].firstname,
      });

      const sendEmail = await nodemailer.sendEmailToUser(
        `http://localhost:3000/resetpassword/${users[0]._id}/${token} `,
        users[0].email
      );

      return res.status(200).send("Email has been send !");
    } else {
      throw "here is no user wiTth that email";
    }
  } catch (error) {
    res.status(400).send({
      error: " there is may be problem with the server, please try again later",
    });
  }
});

router.patch("/resetpassword/:id/:token", async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.params.token;
    const validatePassword =
      await usersValidation.changePasswordResetSchema.validateAsync(req.body, {
        abortEarly: false,
      });

    const user = await usersMoudle.myDetails(id);
    if (user) {
      const veriftToken = await jwt.verifyToken(token);
      if (veriftToken) {
        if (validatePassword.newPassword === validatePassword.newPassword2) {
          const hashPassword = await bcrypt.createPassword(
            validatePassword.newPassword2
          );
          const updatePassword = await usersMoudle.editPassword(
            id,
            hashPassword
          );

          res.status(200).send("Your Password Change !");
        } else {
          throw "passwords are not match";
        }
      } else {
        throw " invalid token";
      }
    } else {
      throw "not email with that user";
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
