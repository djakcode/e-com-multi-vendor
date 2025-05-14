const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/shop.controller");

router.post("/shop", CONTROLLER.createShop);

module.exports = router;
