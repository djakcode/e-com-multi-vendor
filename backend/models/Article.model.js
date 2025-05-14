const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Article = db.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Shop",
        key: "id",
      },
    },
  },
  {
    tableName: "Article",
  },
  {
    timestamps: true,
  }
);

module.exports = Article;
