const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const favoriteProductsSchema = new Schema({
  fromId: { type: mongoose.Types.ObjectId, required: true },
  favorites: [{ id: mongoose.Types.ObjectId }],
});

const Favoirites = mongoose.model("Favorites", favoriteProductsSchema);

const addToFavorites = (userId, product) => {
  const favorite = new Favoirites({ userId, product });
  return favorite.save();
};

module.exports = {
  Favoirites,
  addToFavorites,
};
