const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const items = require("./data/items.json");

const batchImport = async (items) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();       
        const dbName = "ecommerce";
        const db = client.db(dbName);   
        const result = await db.collection("items").insertMany(items);    
        console.log({ status: 201, message: "Success!" });    
    } catch (err) {
        console.log(err.stack);      
        console.log({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
}

batchImport(items);