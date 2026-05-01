require("./models/db"); // connect MongoDB

const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");
const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on network");
});

