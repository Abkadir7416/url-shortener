import mongoose from "mongoose";

const  connectToMongoDB = async(url) => {
    mongoose.connect(url);
}

export default connectToMongoDB;