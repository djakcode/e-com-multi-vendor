const { DataTypes } = require("sequelize");
const db = require("../config/db");

// Define the User model
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
      validate: { isIn: [["user", "admin", "vendor"]] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
