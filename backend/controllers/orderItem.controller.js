const createError = require("../middlewares/error");
const OrderItem = require("../models/OrderItem.model");

const createOrderItem = async (req, res, next) => {
  try {
    const newOrderItem = await OrderItem.create(req.body);
    res
      .status(201)
      .json({ message: "Element ajouté au panier", data: newOrderItem });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll();

    if (!orderItems)
      return next(createError(404, "Aucun produit dans le panier"));

    res
      .status(200)
      .json({ message: "les produits du panier", data: orderItems });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk({
      where: { id: req.params.id },
    });

    if (!orderItem)
      return next(createError(404, "Aucun produit dans le panier"));

    res
      .status(200)
      .json({ message: "Produit retrouvé avec succès", data: orderItem });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const updateOrderItem = async (req, res, next) => {
  try {
    const [updateRows] = await OrderItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucun produit dans le panier"));

    const updatedRows = await OrderItem.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Produit mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const deleteOrderItem = async (req, res, next) => {
  try {
    const deletedOrderItem = await OrderItem.destroy({
      where: { id: req.params.id },
    });

    if (!deletedOrderItem)
      return next(createError(404, "Aucun produit dans le panier"));

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
