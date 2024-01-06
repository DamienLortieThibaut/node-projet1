const sequelize = require("../database/database");

const Get = sequelize.define(
  "get",
  {
    
  },
  {
    freezeTableName: true,
  }
);


module.exports = Get;
