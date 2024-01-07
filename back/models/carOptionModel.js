const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const CarOption = sequelize.define(
  "caroption",
  {
    is_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

module.exports = CarOption;
