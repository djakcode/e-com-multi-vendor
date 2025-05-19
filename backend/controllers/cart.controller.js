const createError = require("../middlewares/error");
const Cart = require("../models/Cart.model");

const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);

    // check if exists article
    if (!cart) return next(createError(404, "Pas de panier existant"));
    res.status(201).json({ message: "Panier créé avec succès", data: cart });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.findAll();

    if (!carts) return next(createError(404, "Aucun panier trouvé"));
    res.status(200).json({ message: "Tous les paniers", data: carts });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByPk({
      where: { id: req.params.id },
    });

    if (!cart) return next(createError(404, "Aucun panier trouvé"));

    res.status(200).json({ message: "Panier trouvé avec succès", data: cart });
  } catch (error) {
    next(createCart(500, "Erreur dans le serveur"));
  }
};

const updateCart = async (req, res, next) => {
  try {
    const [updateRows] = await Cart.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0) return next(createError(404, "Aucun panier trouvé"));

    const updatedRows = await Cart.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Panier mis à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const deletedCart = await Cart.destroy({
      where: { id: req.params.id },
    });

    if (!deletedCart) return next(createError(404, "Aucun panier trouvé"));

    res.status(200).json({ message: "Panier supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};
module.exports = {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
};
