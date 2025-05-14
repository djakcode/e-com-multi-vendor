const createError = require("../middlewares/error");
const Cart = require("../models/Cart.model");

const addToCart = async (req, res, next) => {
  try {
    const article = await Cart.create(req.body, {
      where: {
        id: req.params.articleId,
      },
    });

    // check if exists article
    if (!article) return next(createError(404, "Pas d'article dans le panier"));
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

module.exports = {
  addToCart,
};
