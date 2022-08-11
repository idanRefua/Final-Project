const express = require("express");
const router = express.Router();
const authRoute = require("./api/auth");
const productRoute = require("./api/products");
const authMiddleWare = require("../middleware/auth.middleware");

router.use("/auth", authRoute);
router.use("/products", productRoute);

module.exports = router;
