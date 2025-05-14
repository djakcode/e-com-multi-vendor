const Article = require("../models/Article.model");
const createError = require("../middlewares/error");

const createArticle = async (req, res, next) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      message: "Article créé avec succès",
      newArticle: newArticle,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error));
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const [updateRows] = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if exists article
    if (updateRows === 0)
      return next(createError(404, "l'article n'existe pax"));

    // get updated article
    const updatedArticle = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "l'Article a été mise à jour avec succès",
      data: updatedArticle,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const deleteRows = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Check if exists article
    if (deleteRows === 0)
      return next(createError(404, "L'article n'existe pas"));

    // Send response
    res.status(200).json({
      message: "Article supprimé avec succès",
      data: deleteRows,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json({
      message: "Tous les articles",
      data: articles,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk({
      where: {
        id: req.params.id,
      },
    });

    // check if exists article
    if (!article) return next(createError(404, "l'article n'existe pas"));

    res.status(200).json({
      message: "Article trouvé avec succès",
      data: getArticle,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
};
