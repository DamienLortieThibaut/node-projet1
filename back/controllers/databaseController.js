const Model = require("../models/modelModel");
const Tool = require("../models/toolModel");
const User = require("../models/userModel");
const Buy = require("../models/buyModel");
const Get = require("../models/carOptionModel");
const sequelize = require("../database/database");

// Create all tables in the database
exports.createAllTable = async (req, res) => {
  try {
    // Synchronize models with the database, modifying tables if needed
    await sequelize.sync({ alter: true });
    res.status(200).json("Tables created");
  } catch (error) {
    // Handle errors that may occur during the process
    console.error("Error creating tables:", error);
    res.status(500).json({ error: "Error creating tables" });
  }
};
