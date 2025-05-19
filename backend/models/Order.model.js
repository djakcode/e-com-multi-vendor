const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Order = db.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: { isIn: [["pending", "paid", "shipped", "cancelled"]] },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
