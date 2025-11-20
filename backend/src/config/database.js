const mongoose = require("mongoose")

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongoose connected successfully")
    } catch (error) {
        console.error("Error connecting to mongoDB ", error)
    }
}

module.exports = connectDB;