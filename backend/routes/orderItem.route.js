const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/orderItem.controller");
const verifyToken = require("../middlewares/auth");

router.post("/", verifyToken, CONTROLLER.createOrderItem);
router.get("/", verifyToken, CONTROLLER.getAllOrderItems);
router.get("/:id", verifyToken, CONTROLLER.getOrderItem);
router.put("/:id", verifyToken, CONTROLLER.updateOrderItem);
router.delete("/:id", verifyToken, CONTROLLER.deleteOrderItem);

module.exports = router;
