const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cart = db.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIcrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    tableName: "Cart",
  },
  {
    timestamps: true,
  }
);

module.exports = Cart;
