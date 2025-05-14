const express = require("express");
const ENV = require("./backend/config");
const db = require("./backend/config/db");
const cookieParser = require("cookie-parser");

const app = express();

// Import routes
const userRoutes = require("./backend/routes/user.route");
const shopRoutes = require("./backend/routes/shop.route");
const articleRoutes = require("./backend/routes/article.route");

// Port
const PORT = ENV.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Prefix: /api
app.use("/api/auth", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/article", articleRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  // If the error is a Sequelize error, set the status to 400
  const message = err.message || "Erreur interne du serveur";
  // If the error is a Sequelize error, set the status to 400
  const details = err.details || null;
  // If the error is a Sequelize error, set the status to 400

  res.status(status).json({
    status: status,
    message: message,
    details: details,
  });
});

// Server
const startServer = async () => {
  try {
    // Test database connection
    await db.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Le Server a demarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
  }
};

// Start the server
startServer();
