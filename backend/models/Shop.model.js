const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Shop = db.define(
  "Shop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Shop;
