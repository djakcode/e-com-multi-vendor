const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/cart.controller");
const verifyToken = require("../middlewares/auth");

router.post("/cart", verifyToken, CONTROLLER.createCart);
router.get("/cart", verifyToken, CONTROLLER.getAllCarts);
router.get("/cart/:id", verifyToken, CONTROLLER.getCart);
router.put("/cart/:id", verifyToken, CONTROLLER.updateCart);
router.delete("/cart/:id", verifyToken, CONTROLLER.deleteCart);

module.exports = router;
