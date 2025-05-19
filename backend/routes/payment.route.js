const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/payment.controller");
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

router.post("/", verifyToken, CONTROLLER.createPayment);
router.get("/", verifyToken, CONTROLLER.getAllPayments);
router.get("/:id", verifyToken, CONTROLLER.getPayment);
router.put("/:id", verifyToken, CONTROLLER.updatePayment);
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  CONTROLLER.deletePayment
);

module.exports = router;
