const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

// Route to create a new user
router.post("/signup", CONTROLLER.signup);
router.post("/login", CONTROLLER.signin);
router.get("/", verifyToken, checkRole("admin"), CONTROLLER.getUsers);
router.get("/:id", verifyToken, CONTROLLER.getUser);
router.delete("/:id", verifyToken, checkRole("admin"), CONTROLLER.deleteUser);
router.put("/:id", verifyToken, CONTROLLER.updateUser);

module.exports = router;
