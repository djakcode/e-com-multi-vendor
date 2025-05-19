const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Payment = db.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [["card", "mobile", "cash"]] },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      validate: { isIn: [["pending", "completed", "failed"]] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Payment;
