const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;
const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  shortinfo: { type: String, required: true },
  description: { type: String, required: true },
  likes: [String],
  category: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
  reviews: [
    {
      review: String,
      byUser: { type: mongoose.Types.ObjectId },
      userName: String,
    },
  ],
});

const Products = mongoose.model("Products", productSchema);

const addProduct = (
  category,
  title,
  image,
  shortinfo,
  description,
  price,
  likes,
  createdBy
) => {
  const product = new Products({
    category,
    title,
    image,
    shortinfo,
    description,
    price,
    likes,
    createdBy,
  });
  return product.save();
};

const allProducts = () => {
  return Products.find({});
};

const productById = (id) => {
  return Products.findOne({ _id: id });
};

const productsByUserId = (createdBy) => {
  return Products.find({ createdBy });
};

const deleteProduct = (id) => {
  return Products.deleteOne({ _id: id });
};

const updateProduct = (
  id,
  userId,
  valdiateTtile,
  valdiateShortinfo,
  validateDescription,
  validateImage,
  validatePrice,
  validateCategory
) => {
  const filter = {
    _id: id,
    createdBy: userId,
  };
  const updateProduct = {
    $set: {
      title: valdiateTtile,
      shortinfo: valdiateShortinfo,
      description: validateDescription,
      category: validateCategory,
      image: validateImage,
      price: validatePrice,
    },
  };

  return Products.findOneAndUpdate(filter, updateProduct);
};

const addLikeToProduct = (id, userId) => {
  const filter = {
    _id: id,
  };

  const addLike = {
    $addToSet: { likes: userId },
  };

  return Products.findOneAndUpdate(filter, addLike);
};

const myFavourites = (userId) => {
  return Products.find({ likes: { $in: [userId] } });
};

const removeLikeFromProduct = (id, userId) => {
  return Products.findByIdAndUpdate(id, { $pull: { likes: userId } });
};

const allDesktopPcProducts = () => {
  return Products.find({ category: "Desktop PC" });
};

const allSmartphoneProducts = () => {
  return Products.find({ category: "Smartphones" });
};

const allLaptopProducts = () => {
  return Products.find({ category: "Laptops" });
};

const myCart = (userCart) => {
  return Products.find().where("_id").in(userCart).exec();
};

const checkReview = (productId, userId) => {
  return Products.findOne({
    _id: productId,
    reviews: { $elemMatch: { byUser: userId } },
  });
};

const addReviewToProduct = (productId, reviewFromUser, userId, userName) => {
  const filter = {
    _id: productId,
  };
  const addReview = {
    $addToSet: {
      reviews: { review: reviewFromUser, byUser: userId, userName: userName },
    },
  };

  return Products.findOneAndUpdate(filter, addReview);
};

const deleteMyReview = (productId, userId) => {
  const filter = {
    _id: productId,
  };

  const deleteReview = {
    $pull: { reviews: { byUser: userId } },
  };

  return Products.findOneAndUpdate(filter, deleteReview);
};

const editMyReview = (productId, userId, editReview) => {
  const filter = {
    _id: productId,
  };

  const editMyReview = {
    $set: { reviews: { byUser: userId, review: editReview } },
  };

  return Products.findOneAndUpdate(filter, editMyReview);
};

module.exports = {
  addProduct,
  allProducts,
  productsByUserId,
  deleteProduct,
  updateProduct,
  addLikeToProduct,
  myFavourites,
  removeLikeFromProduct,
  allDesktopPcProducts,
  productById,
  allSmartphoneProducts,
  allLaptopProducts,
  myCart,
  addReviewToProduct,
  checkReview,
  deleteMyReview,
  editMyReview,
};
