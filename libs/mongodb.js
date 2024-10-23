import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("La base de datos, conectada")
    } catch (error) {
        
    }
}

export default connectMongoDB;