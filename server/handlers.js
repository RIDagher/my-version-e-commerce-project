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

const addToCart = async (req, res)  => {
// hello
    const element = req.body;

    console.log("element:", element);
    
    if ( !element ) {
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
        const result = await db.collection("users").insertOne( element.element );     
        console.log("result:", result);   
        client.close();       
        return res.status(201).json({ status: 201, message: "success", result });   
    
    }    
    catch (err) {
       res.status(500).json({ status: 500, message: err.message });
    }

}


const getCart = async (req, res)  => {
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
}


module.exports = {
  getProducts,
  getProduct,
  addToCart,
  getCart,
};
