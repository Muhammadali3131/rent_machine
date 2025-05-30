const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Category = require("./category.model");
const User = require("./users.model");
const Region = require("./region.model");
const District = require("./district.model");

const Machine = sequelize.define("machine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  price_per_hour: {
    type: DataTypes.DECIMAL(10, 2),
  },
  description: {
    type: DataTypes.TEXT,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATEONLY,
  },
  min_hour: {
    type: DataTypes.STRING
  },
  min_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

Category.hasMany(Machine)
Machine.belongsTo(Category)

User.hasMany(Machine);
Machine.belongsTo(User);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

module.exports = Machine