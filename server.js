const express = require("express");
const ENV = require("./backend/config");
const db = require("./backend/config/db");

const app = express();

// Import routes

// Port
const PORT = ENV.PORT || 8000;

// Middleware

// Prefix: /api

// Middleware for error handling
app.use((err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  const details = err.details;

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
    await db.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Le Server a demarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error.message);
  }
};

// Start the server
startServer();
