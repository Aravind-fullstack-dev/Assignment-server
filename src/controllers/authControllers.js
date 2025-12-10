const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/userModel.js");
const { generateToken } = require("../utils/generateToken.js");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.register = async( req, res ) =>{
  try {
    const {user_name, email, password, mobile_number, department, role, salary, date_of_joining } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createEmployee(user_name, email, hashedPassword, mobile_number, department, role, salary, date_of_joining);
    const token = generateToken(user);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_name,
        role: user.role,
      },
    });
    
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}