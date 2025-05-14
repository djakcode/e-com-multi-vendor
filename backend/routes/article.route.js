const express = require("express");
const CONTROLLER = require("../controllers/article.controller");

const router = express.Router();

router.post("/", CONTROLLER.createArticle);
router.put("/:id", CONTROLLER.updateArticle);
router.delete("/:id", CONTROLLER.deleteArticle);
router.get("/", CONTROLLER.getAllArticles);
router.get("/:id", CONTROLLER.getArticle);

module.exports = router;
