import mongoose from "mongoose";

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error while Connected to MongoDB : ", error);
  }
};

export default ConnectMongoDB;
