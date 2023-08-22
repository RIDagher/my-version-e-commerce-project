"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getProducts,
  getProduct,
  addToCart,
  getCart,
  removeFromCart,
  getProductByCategory,
  getProductByBodyLocation,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/getProducts", getProducts)
  .get("/getProduct/:product", getProduct)
  .post("/add-to-cart", addToCart)
  .get("/get-cart", getCart)

  .delete("/remove-from-cart", removeFromCart)

  .get("/categories/:category", getProductByCategory)
  .get("/bodyLocation/:body_location", getProductByBodyLocation)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
