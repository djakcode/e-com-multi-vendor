const { DataTypes } = require("sequelize");
const db = require("../config/db");

// Define the User model
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      validate: {
        isIn: [["user", "admin", "superadmin", "moderator"]],
      },
    },
  },
  {
    tableName: "User",
  },
  {
    timestamps: true,
  }
);

module.exports = User;
