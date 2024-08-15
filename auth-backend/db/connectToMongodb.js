import mongoose from "mongoose";

const connectToMongodb = async() =>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("Connceted to mongodb");
    } catch (error) {
        console.log("Couldnt connect to the db"+error); 
    }
}

export default connectToMongodb