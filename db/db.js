const { MongoClient } = require("mongodb");
const uri = process.env.URI;
    
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser:true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("bookstore");
    console.log('Db connected!');
}

// console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;