const Shop = require("../models/Shop.model");
const createError = require("../middlewares/error");

const createShop = async (req, res, next) => {
  try {
    const newShop = await Shop.create(req.body);
    res.status(201).json({
      message: "Magasin créé avec succès",
      newShop: newShop,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error));
  }
};

module.exports = {
  createShop,
};
