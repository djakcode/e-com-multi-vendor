const { DataTypes } = require("sequelize");
const db = require("../config/db");

const CartItem = db.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CartItem;
