import mongoose from "mongoose";


export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
};