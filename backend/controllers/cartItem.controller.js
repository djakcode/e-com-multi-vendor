const CartItem = require("../models/CartItem.model");
const createError = require("../middlewares/error");

const createCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body);
    if (!cartItem)
      return next(createError(404, "Aucun produit dans votre panier"));

    res.status(201).json({
      message: "Produit ajouté au panier avec succès",
      data: cartItem,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getAllCartItems = async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll();
    if (!cartItems)
      return next(createError(404, "Aucun produit dans le panier"));

    res
      .status(200)
      .json({ message: "Tous les produits de votre panier", data: cartItems });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk({
      where: { id: req.params.id },
    });

    if (!cartItem)
      return next(createError(404, "Aucun produit trouvé dans notre panier"));

    res
      .status(200)
      .json({ message: "Produit trouvé avec succès", data: cartItem });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const [updateRows] = await CartItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0) return next(createError(404, "Aucun produit trouvé"));

    const updatedRows = await CartItem.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Produit mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const deletedCartItem = await CartItem.destroy({
      where: { id: req.params.id },
    });

    if (!deletedCartItem) return next(createError(404, "Aucun produit trouvé"));

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItem,
  updateCartItem,
  deleteCartItem,
};
