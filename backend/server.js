const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Consider configuring cors() with specific options for better security

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// Routes
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
  const { name, email } = req.body;
  db.query(sql, [name, email], (err, data) => {
    if (err) {
      console.error("Error creating student:", err);
      return res.status(500).json({ error: "Error creating student" });
    }
    return res
      .status(201)
      .json({ message: "Student created successfully", data });
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
  const { name, email } = req.body;
  const id = req.params.id;
  db.query(sql, [name, email, id], (err, data) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ error: "Error updating student" });
    }
    return res.json({ message: "Student updated successfully", data });
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ error: "Error deleting student" });
    }
    return res.json({ message: "Student deleted successfully", data });
  });
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
