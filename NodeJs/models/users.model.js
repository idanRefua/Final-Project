const { options } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, required: true },
  cart: [String],
});

const Users = mongoose.model("Users", userSchema);

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const addUser = (email, password, firstname, lastname, isAdmin, phone) => {
  const user = new Users({
    email,
    password,
    firstname,
    lastname,
    phone,
    isAdmin,
  });

  return user.save();
};

const editUserDetail = (
  id,
  validateEmail,
  validateName,
  validateLastname,
  valdiatePhone
) => {
  const filter = { _id: id };
  const update = {
    $set: {
      email: validateEmail,
      firstname: validateName,
      lastname: validateLastname,
      phone: valdiatePhone,
    },
  };
  const options = { new: true, useFindAndModify: false };

  return Users.findOneAndUpdate(filter, update, options);
};

const myDetails = (id) => {
  return Users.findOne({ _id: id });
};

const editPassword = (id, validatePassword) => {
  const filter = { _id: id };
  const update = { $set: { password: validatePassword } };
  const options = { new: true, useFindAndModify: false };

  return Users.findOneAndUpdate(filter, update, options);
};

const addToCart = (userId, productId) => {
  const filter = {
    _id: userId,
  };

  const addToCart = {
    $addToSet: { cart: productId },
  };

  return Users.findOneAndUpdate(filter, addToCart);
};

const removeFromCart = (userId, productId) => {
  return Users.findByIdAndUpdate(userId, { $pull: { cart: productId } });
};

const deleteAllMyCart = (userId) => {
  return Users.findByIdAndUpdate(userId, { $set: { cart: [] } });
};

module.exports = {
  selectUserByEmail,
  addUser,
  editUserDetail,
  myDetails,
  editPassword,
  addToCart,
  removeFromCart,
  deleteAllMyCart,
};
