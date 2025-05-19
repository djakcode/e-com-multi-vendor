const express = require("express");
const CONTROLLER = require("../controllers/order.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.post("/", verifyToken, CONTROLLER.createOrder);
router.get("/", verifyToken, CONTROLLER.getAllOrders);
router.get("/:id", verifyToken, CONTROLLER.getOrder);
router.put("/:id", verifyToken, CONTROLLER.updateOrder);
router.delete("/:id", verifyToken, CONTROLLER.deleteOrder);

module.exports = router;
