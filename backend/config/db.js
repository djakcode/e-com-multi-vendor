const Sequelize = require("sequelize");
const ENV = require("./index.js");

console.log("Initialisation de MySQL...");

// Initialize Sequelize with environment variables
const db = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DIALECT,
  port: ENV.DB_PORT,
  logging: false, // Disable logging for cleaner output
});

// function to test the database connection
const connectDB = async () => {
  try {
    console.log("Essai de connexion à la base de données...");
    await db.authenticate();
    console.log("Connexion à la base de données réussie !");
  } catch (error) {
    console.error("Problème de connexion à la base de données:", error.message);
  }
};

// Call the function to test the connection
connectDB();

module.exports = db;
