const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const CONTROLLER = require("../controllers/cartItem.controller");

router.post("/", verifyToken, CONTROLLER.createCartItem);
router.get("/", verifyToken, CONTROLLER.getAllCartItems);
router.get("/:id", verifyToken, CONTROLLER.getCartItem);
router.put("/:id", verifyToken, CONTROLLER.updateCartItem);
router.delete("/:id", verifyToken, CONTROLLER.deleteCartItem);

module.exports = router;
