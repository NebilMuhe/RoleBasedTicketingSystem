import * as mongoose from "mongoose";


const url = process.env.MONGODB_URL || "mongodb://localhost:27017/defaultdb";


const connectMongoDB = async () => {
    await mongoose.connect(url);
};

export default connectMongoDB;