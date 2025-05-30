const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./users.model");
const Machine = require("./machine.model");

const Contract = sequelize.define("contract", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING, // misol: 'active', 'completed', 'canceled'
    defaultValue: "active",
  },
  created_at: {
    type: DataTypes.DATEONLY,
  },
});

User.hasMany(Contract);
Contract.belongsTo(User);

Machine.hasMany(Contract);
Contract.belongsTo(Machine);

module.exports = Contract;
