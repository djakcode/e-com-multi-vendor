const createError = require("../middlewares/error");
const Order = require("../models/Order.model");

const createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    if (!newOrder) return next(createError(404, "Pas de commande"));

    res
      .status(201)
      .json({ message: "Commande créée avec succès", data: newOrder });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    if (!orders) return next(createError(404, "Aucune commande trouvéé"));

    res.status(200).json({ message: "Commandes trouvées", data: orders });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk({
      where: { id: req.params.id },
    });

    if (!order) return next(createError(404, "Pas de commande"));

    res
      .status(200)
      .json({ message: "Commande trouvée avec succès", data: order });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const [updateRows] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateOrder === 0)
      return next(createError(404, "Aucune commande trouvée"));

    const updatedRows = await Order.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Commande mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.destroy({
      where: { id: req.params.id },
    });

    if (!deletedOrder) return next(createError(404, "Aucune commande trouvée"));

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
