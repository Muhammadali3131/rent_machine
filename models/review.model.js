const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./users.model");
const Machine = require("./machine.model");

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATEONLY,
  },
});

User.hasMany(Review);
Review.belongsTo(User);

Machine.hasMany(Review);
Review.belongsTo(Machine);

module.exports = Review;
