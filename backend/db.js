const mongoose = require('mongoose');
// It's best practice to store your database URI in an environment variable
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;
