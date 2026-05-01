require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("Connection Error:", err));

module.exports = mongoose;

