const Transaction = require("../models/Transaction"); // ✅ IMPORTANT

const addTransaction = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const data = await Transaction.create(req.body);

    res.status(201).json(data);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return updated data
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};