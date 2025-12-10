const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Important for reading req.body

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
