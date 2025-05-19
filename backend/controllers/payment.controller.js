const createError = require("../middlewares/error");
const Payment = require("../models/Payment.model");

const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);

    if (!payment) return next(createError(404, "Erreur lors du paiment"));

    res
      .status(201)
      .json({ message: "Paiement éffectué avec succès", data: payment });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll();
    if (!payments) return next(createError(404, "Aucun paiement trouvé"));

    res
      .status(200)
      .json({ message: "Tous les paiements trouvés", data: payments });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk({
      where: { id: req.params.id },
    });

    if (!payment) return next(createError(404, "Aucun paiement trouvé"));

    res
      .status(200)
      .json({ message: "Paiement retrouvé avec succès", data: payment });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const [updateRows] = await Payment.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0)
      return next(createError(404, "Aucun paiement mise à jour"));

    const updatedRows = await Payment.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Paiement mise à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const deletedPayment = await Payment.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPayment) return next(createError(404, "Aucun paiment trouvé"));

    res.status(200).json({ message: "Paiement supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
