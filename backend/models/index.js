const db = require("../config/db");

// Import models
const User = require("./User.model");
const Shop = require("./Shop.model");
const Article = require("./Article.model");
const Cart = require("./Cart.model");
const Order = require("./Order.model");
const OrderItem = require("./OrderItem.model");
const Payment = require("./Payment.model");
const CartItem = require("./CartItem.model");

// Define associations

// User association
User.hasMany(Shop, {
  foreignKey: "ownerId",
  as: "shops",
});
Shop.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

// Shop association
Shop.hasMany(Article, {
  foreignKey: "shopId",
  as: "articles",
});
Article.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shop",
});

// Cart association
// ? with User
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasOne(Cart, {
  foreignKey: "userId",
  as: "carts",
});

// ? with Article
Cart.belongsTo(Article, {
  foreignKey: "articleId",
  as: "article",
});
Article.hasMany(Cart, {
  foreignKey: "articleId",
  as: "carts",
});

// ? with Shop
Cart.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shop",
});
Shop.hasMany(Cart, {
  foreignKey: "shopId",
  as: "carts",
});

// Order association
// ? with User
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});

// ? with Shop
Order.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shop",
});
Shop.hasMany(Order, {
  foreignKey: "shopId",
  as: "orders",
});

// ? with OrderItem
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "orderItems",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

// ? with Payment
Order.hasOne(Payment, {
  foreignKey: "orderId",
  as: "payment",
});
Payment.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

// Payment association
// ? with user
Payment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Payment, {
  foreignKey: "userId",
  as: "payments",
});

// CartItem association
// ? with Cart
Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "items",
});
CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
  as: "cart",
});
// ? with article
CartItem.belongsTo(Article, {
  foreignKey: "articleId",
  as: "article",
});

// ? with shop
Payment.belongsTo(Shop, {
  foreignKey: "shopId",
  as: "shop",
});
Shop.hasMany(Payment, {
  foreignKey: "shopId",
  as: "payments",
});

// Export models
module.exports = {
  User,
  Shop,
  Article,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
};
