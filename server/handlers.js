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

const addToCart = async (req, res) => {
  // hello
  const element = req.body;

  //console.log("element:", element);

  if (!element) {
    return res.status(400).json({ status: 400, message: "Data not found" });
  }
  // let newUUID = uuidv4();
  // let productToAdd = {
  //     element.element
  // };

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const dbName = "ecommerce";
    const db = client.db(dbName);
    const result = await db.collection("users").insertOne(element.element);
    // const currentStock = await db.collection("users").findOne({_id: element});

    console.log("HELLO", element);
    console.log("_id", element.element._id);
    console.log("typeof:", typeof element);

    // check for 0 stock
    await db
      .collection("items")
      .updateOne({ _id: element.element._id }, { $inc: { numInStock: -1 } });

    console.log("result:", result);
    client.close();
    return res.status(201).json({ status: 201, message: "success", result });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const dbName = "ecommerce";
    const db = client.db(dbName);
    let result = await db.collection("users").find().toArray();
    console.log(result);

    client.close();
    return res.status(200).json({ status: 200, data: result, message: "" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const element = req.body;
  console.log("element:", element);

  if (!element) {
    return res.status(400).json({ status: 400, message: "Data not found" });
  }

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const dbName = "ecommerce";
    const db = client.db(dbName);
    const result = await db.collection("users").deleteOne(element.element);

    await db
      .collection("items")
      .updateOne({ _id: element.element._id }, { $inc: { numInStock: +1 } });

    console.log("result:", result);
    client.close();
    return res.status(201).json({ status: 201, message: "success", result });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  console.log("category:", category);
  console.log("type of:", typeof category);
  const client = new MongoClient(MONGO_URI, options);
  const upperCase = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    await client.connect();
    console.log("connected!");

    const dbName = "ecommerce";
    const db = client.db(dbName);
    const productData = await db
      .collection("items")
      .find({ category: upperCase })
      .toArray();
    console.log("this is the category", productData);
    if (productData) {
      return res
        .status(200)
        .json({ status: 200, data: productData, message: "success" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
      // console.log("error fetching product ");
    }
  } catch (error) {
    // console.log("Error", error);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

const getProductByBodyLocation = async (req, res) => {
  const { body_location } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  const upperCase =
    body_location.charAt(0).toUpperCase() + body_location.slice(1);

  try {
    await client.connect();
    console.log("connected!");

    const dbName = "ecommerce";
    const db = client.db(dbName);
    const productData = await db
      .collection("items")
      .find({ body_location: upperCase })
      .toArray();

    if (productData) {
      return res
        .status(200)
        .json({ status: 200, data: productData, message: "success" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
      // console.log("error fetching product ");
    }
  } catch (error) {
    // console.log("Error", error);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
    console.log("disconnected!");
  }
};

module.exports = {
  getProducts,
  getProduct,
  addToCart,
  getCart,
  removeFromCart,
  getProductByCategory,
  getProductByBodyLocation,
};
