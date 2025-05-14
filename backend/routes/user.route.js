const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/user.controller");

// Route to create a new user
router.post("/signup", CONTROLLER.signup);
router.post("/login", CONTROLLER.signin);
router.get("/", CONTROLLER.getUsers);
router.delete("/:id", CONTROLLER.deleteUser);
router.put("/:id", CONTROLLER.updateUser);
module.exports = router;
