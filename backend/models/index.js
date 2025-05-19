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

// RELATIONS

// User
User.hasMany(Shop, { foreignKey: "ownerId", as: "shops" });
Shop.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(Cart, { foreignKey: "userId", as: "cart" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

// Shop
Shop.hasMany(Article, { foreignKey: "shopId", as: "articles" });
Article.belongsTo(Shop, { foreignKey: "shopId", as: "shop" });

Shop.hasMany(Payment, { foreignKey: "shopId", as: "payments" });
Payment.belongsTo(Shop, { foreignKey: "shopId", as: "shop" });

// Article
Article.hasMany(OrderItem, { foreignKey: "articleId", as: "orderItems" });
OrderItem.belongsTo(Article, { foreignKey: "articleId", as: "article" });

Article.hasMany(CartItem, { foreignKey: "articleId", as: "cartItems" });
CartItem.belongsTo(Article, { foreignKey: "articleId", as: "article" });

// Order
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Cart
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "cartItems" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });
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
