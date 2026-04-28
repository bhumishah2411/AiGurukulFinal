require('dotenv').config();
const mongoose = require('mongoose');

const uri = "mongodb://bhumiishahh24:bhumishah2406@ac-6bbh3bx-shard-00-00.iwswhwd.mongodb.net:27017,ac-6bbh3bx-shard-00-01.iwswhwd.mongodb.net:27017,ac-6bbh3bx-shard-00-02.iwswhwd.mongodb.net:27017/aigurukul?ssl=true&replicaSet=atlas-oaieha-shard-0&authSource=admin&retryWrites=true&w=majority";

async function testConnection() {
    try {
        console.log("Connecting without SRV...");
        await mongoose.connect(uri);
        console.log("SUCCESS!");
        process.exit(0);
    } catch (err) {
        console.error("FAIL:", err.message);
        process.exit(1);
    }
}
testConnection();
