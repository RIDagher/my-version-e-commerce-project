"use strict";
const { MongoClient } = require("mongodb");
// require('dotenv').config({ path: '../.env' })
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const dbName = "ecommerce";
    const db = client.db(dbName);
    let result = await db.collection("items").find().toArray();
    console.log(result);

    client.close();
    return res.status(200).json({ status: 200, data: result, message: "" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getProduct = async (req, res) => {
  const { item } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");

    const dbName = "ecommerce";
    const db = client.db(dbName);
    const productData = await db.collection("items").findOne({ item });
    console.log("this is the product", productData);
    if (productData) {
      return res
        .status(200)
        .json({ status: 200, data: productData.data, message: "success" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
      console.log("error fetching product ");
    }
  } catch (error) {
    console.log("Error", error);
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getProducts,
  getProduct,
};
