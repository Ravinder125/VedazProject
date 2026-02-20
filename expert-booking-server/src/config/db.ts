import mongoose from "mongoose";
import { ENV } from "./env";
import { DB_NAME } from "../constants";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            ENV.MONGO_URI as string,
            { dbName: DB_NAME });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ DB Connection Failed");
        process.exit(1);
    }
};