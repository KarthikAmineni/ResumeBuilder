const mongoose = require("mongoose");
// const dotenv = require("dotenv");

const connectDB = async () => {
    console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      process.exit(1);
    }
};

module.exports = connectDB;