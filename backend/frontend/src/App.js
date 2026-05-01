import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");

  const fetchTransactions = () => {
    fetch("http://192.168.1.4:3000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);



  const deleteTransaction = (id) => {
    fetch(`http://192.168.1.4:3000/api/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTransactions())
      .catch((err) => console.error(err));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const addTransaction = () => {
    fetch("http://192.168.1.4:3000/api/transactions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        amount: Number(amount),
        description,
        type,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTransactions();
        setCategory("");
        setAmount("");
        setDescription("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2 className="title"> Expense Tracker</h2>

      <div className="dashboard">
        <div className="balance-card">
          <h3>Total Balance</h3>
          <h1>₹{balance}</h1>
        </div>

        <div className="summary">
          <div className="income">
            <p>Income</p>
            <h4>₹{income}</h4>
          </div>

          <div className="expense">
            <p>Expense</p>
            <h4>₹{expense}</h4>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button onClick={addTransaction}>Add</button>
      </div>

      {/* LIST */}
      <div className="list">
        {transactions.length === 0 ? (
          <p className="no-data">No transactions found</p>
        ) : (
          transactions.map((t) => (
            <div key={t._id} className="card">
              <div className="card-header">
                <span className="category">{t.category}</span>
                <span className="amount">₹{t.amount}</span>
              </div>

              <p className="desc">{t.description}</p>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(t._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;