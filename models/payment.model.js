const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract = require("./contract.model");

const Payment = sequelize.define("payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATEONLY,
  },
  method: {
    type: DataTypes.STRING,
  },
});

Contract.hasMany(Payment);
Payment.belongsTo(Contract);

module.exports = Payment;
