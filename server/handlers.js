"use strict";
const { MongoClient } = require("mongodb");
// require('dotenv').config({ path: '../.env' })
require('dotenv').config();
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
        let result = (await db.collection("items").find().toArray());    
        console.log(result);

        client.close(); 
        return res.status(200).json({ status: 200, data: result, message: "" });
    }    
    catch (err) {
       res.status(500).json({ status: 500, message: err.message });
    }
  
};

module.exports = {
    getProducts,
};