const express = require("express");
const CONTROLLER = require("../controllers/article.controller");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, CONTROLLER.createArticle);
router.put("/:id", verifyToken, CONTROLLER.updateArticle);
router.delete("/:id", verifyToken, CONTROLLER.deleteArticle);
router.get("/", verifyToken, CONTROLLER.getAllArticles);
router.get("/:id", verifyToken, CONTROLLER.getArticle);

module.exports = router;
