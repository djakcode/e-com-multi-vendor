const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/shop.controller");
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

router.post("/shop", CONTROLLER.createShop);
router.get("/shop", verifyToken, checkRole("admin"), CONTROLLER.getAllShops);
router.get("/shop/:id", verifyToken, CONTROLLER.getShop);
router.put("/shop/:id", verifyToken, CONTROLLER.updateShop);
router.delete(
  "/shop/:id",
  verifyToken,
  checkRole("admin"),
  CONTROLLER.deleteShop
);
module.exports = router;
