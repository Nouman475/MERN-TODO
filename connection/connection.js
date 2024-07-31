const mongoose = require("mongoose")

const connection = async(req,res) => {
  try {
    await mongoose
  .connect("mongodb+srv://Nouman:475909@cluster0.0eysc0e.mongodb.net/")
  .then(() => console.log("MongoDB Connected..."))
  } catch (error) {
    res.status(400).json({
        message: "Error connecting to MongoDB",
    })
  }
}

connection()
