const dotenv = require("dotenv");

dotenv.config();
console.log("Dialect", process.env.DIALECT);
console.log("database:", process.env.DATABASE);
console.log("user:", process.env.DB_USER);
console.log("port:", process.env.PORT);
// .env config
const ENV = {
  PORT: process.env.PORT || 8000,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE,
  DB_PORT: process.env.DB_PORT,
  DIALECT: process.env.DIALECT,
  TOKEN: process.env.TOKEN,
};

module.exports = ENV;
