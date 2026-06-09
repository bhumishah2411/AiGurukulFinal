require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb+srv://bhavikapatel4298_db_user:bhavikamongodb@cluster0.wllm5wx.mongodb.net/?appName=Cluster0";

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
