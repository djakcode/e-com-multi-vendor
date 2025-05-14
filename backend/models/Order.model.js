const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Order = db.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    shopId: {
      type: DataTypes.INTERGER,
      allowNull: false,
      references: {
        model: "Shop",
        key: "id",
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente",
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente",
    },
  },
  {
    tableName: "Order",
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
