const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cart = db.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cart;
