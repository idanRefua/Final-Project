const express = require("express");
const router = express.Router();
const productsMoudle = require("../../models/product.model");
const productValidation = require("../../validation/product.validation");
const authMiddleWare = require("../../middleware/auth.middleware");
const usersMoudle = require("../../models/users.model");
const reviewValidation = require("../../validation/review.validation");
const nodemailer = require("../../util/sendEmail");

router.get("/", async (req, res) => {
  try {
    const allProducts = await productsMoudle.allProducts();
    res.status(200).json({ allProducts });
  } catch (err) {
    res.status(400).json({ err });
    console.log(err);
  }
});

router.get("/desktoppc", authMiddleWare, async (req, res) => {
  try {
    const allDesktopPc = await productsMoudle.allDesktopPcProducts({});
    res.status(200).json({ allDesktopPc });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/smartphones", authMiddleWare, async (req, res) => {
  try {
    const allSmartphones = await productsMoudle.allSmartphoneProducts({});

    res.status(200).json({ allSmartphones });
  } catch (error) {
    res.status(400).json({ error });
    console.log(err);
  }
});

router.get("/laptops", authMiddleWare, async (req, res) => {
  try {
    const allLaptops = await productsMoudle.allLaptopProducts({});

    res.status(200).json({ allLaptops });
  } catch (error) {
    res.status(400).json({ error });
    console.log(err);
  }
});

router.get("/moreinfo/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productsMoudle.productById(productId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

router.get("/myproducts", authMiddleWare, async (req, res) => {
  try {
    if (req.userData.isAdmin) {
      const idUser = req.userData._id;
      const myProducts = await productsMoudle.productsByUserId(idUser);
      res.status(200).json({ myProducts });
    } else
      (err) => {
        throw " You are not admin user";
      };
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/createproduct", authMiddleWare, async (req, res) => {
  try {
    if (req.userData.isAdmin) {
      const validateProduct =
        await productValidation.productSchema.validateAsync(
          {
            ...req.body,
            createdBy: req.userData._id,
          },
          {
            abortEarly: true,
          }
        );
      const newProduct = await productsMoudle.addProduct(
        validateProduct.category,
        validateProduct.title,
        validateProduct.image
          ? validateProduct.image
          : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg",
        validateProduct.shortinfo,
        validateProduct.description,
        validateProduct.price,
        validateProduct.likes,
        req.userData._id
      );

      res.status(201).json({ msg: "You created new Product !" });
    } else
      (err) => {
        console.log("You are not admin user ", err);
      };
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete("/deleteproduct/:id", authMiddleWare, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productsMoudle.deleteProduct(id);
    res.status(200).json(`This Product Deleted ! ${deleteProduct}`);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.patch("/updateproducts/:id", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const id = req.params.id;

    const validateEditProduct =
      await productValidation.editProductSchema.validateAsync(req.body, {
        abortEarly: true,
      });

    const updatedProduct = await productsMoudle.updateProduct(
      id,
      userId,
      validateEditProduct.title,
      validateEditProduct.shortinfo,
      validateEditProduct.description,
      validateEditProduct.image
        ? validateEditProduct.image
        : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg",
      validateEditProduct.price,
      validateEditProduct.category
    );

    res.status(200).json("you update your product");
  } catch (error) {
    res
      .status(400)
      .send(
        "we can't update your product card right now try again later ",
        error
      );
  }
});

router.get("/myfavourites", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const myFavourites = await productsMoudle.myFavourites(userId);
    res.json({ myFavourites });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/addlike/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userData._id;
    const like = await productsMoudle.addLikeToProduct(productId, userId);

    res.status(200).json({ like });
  } catch (error) {
    res.status(400).send({ error: "can't add to favourites right now" });
  }
});

router.get("/mycart", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const user = await usersMoudle.myDetails(userId);
    const myCart = await productsMoudle.myCart(user.cart);

    return res.status(200).send(myCart);
  } catch (error) {
    res.status(400).send({ error: "Failed to access to Your cart" });
  }
});

router.post("/removelikeproduct/:id", authMiddleWare, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userData._id;
    const removeLike = await productsMoudle.removeLikeFromProduct(
      productId,
      userId
    );

    res.status(200).json({ removeLike });
  } catch (error) {
    res.status(400).send({ error: "Failed to Remove Favourite Product" });
  }
});
router.post("/addtocart/:id", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const productId = req.params.id;
    const addToCart = await usersMoudle.addToCart(userId, productId);
    return res.status(200).json({ addToCart });
  } catch (error) {
    res.status(400).send({ error: "Failed to add product to your cart" });
  }
});

router.delete("/removefrommycart/:id", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const productId = req.params.id;
    const removeProuductFromMyCart = await usersMoudle.removeFromCart(
      userId,
      productId
    );
    return res.status(200).json(removeProuductFromMyCart);
  } catch (error) {
    res.status(400).send({ error: "Failed to delete product from your cart" });
  }
});

router.post("/buyproducts", authMiddleWare, async (req, res) => {
  try {
    const emailUser = req.userData.email;
    const userName = req.userData.firstname;
    const userId = req.userData._id;

    const user = await usersMoudle.myDetails(userId);
    const userCart = await productsMoudle.myCart(user.cart);

    if (userCart.length > 0) {
      const sendMail = await nodemailer.sendEmailAfterBuyPorducts(
        userName,
        userCart,
        emailUser
      );
      const deleteAllTheCart = await usersMoudle.deleteAllMyCart(userId);

      res.status(200).send("Thank You ! Hope to see you buy here again !");
    } else {
      throw "You cart is Empty!";
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/addreviewtoproduct/:id", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const userName = req.userData.firstname;
    const productId = req.params.id;

    const validateReview =
      await reviewValidation.reviewProductSchema.validateAsync(
        { ...req.body, byUser: req.userData._id },
        { abortEarly: true }
      );

    const userReview = await productsMoudle.checkReview(productId, userId);
    if (!userReview) {
      const addReview = await productsMoudle.addReviewToProduct(
        productId,
        validateReview.review,
        userId,
        userName
      );
      return res.status(200).send(addReview);
    } else {
      throw "You are already review this product";
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

router.delete("/deletemyreview/:id", authMiddleWare, async (req, res) => {
  try {
    const userId = req.userData._id;
    const productId = req.params.id;

    const removeMyReivew = await productsMoudle.deleteMyReview(
      productId,
      userId
    );

    res.status(200).send(removeMyReivew);
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

module.exports = router;
