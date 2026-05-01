const mongoose = require("./db");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "expense",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);