import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected")
    } catch (error) {
        console.log("error to Mongodb", error);
        process.exit(1)
    }
}