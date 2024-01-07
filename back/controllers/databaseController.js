const Model = require("../models/modelModel");
const Tool = require("../models/toolModel");
const User = require("../models/userModel");
const Buy = require("../models/buyModel");
const Get = require("../models/carOptionModel");
const sequelize = require("../database/database");

exports.createAllTable = async (req, res) => {
  await sequelize.sync({ alter: true });
  res.status(200).json("Tables creer");
};
