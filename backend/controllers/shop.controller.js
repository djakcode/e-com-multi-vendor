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

const getAllShops = async (req, res, next) => {
  try {
    const shops = await Shop.findAll();
    if (!shops) return next(createError(404, "Aucun magasin trouvé"));
    res.status(200).json({ message: "Tous les magasins", data: users });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByPk({
      where: { id: req.params.id },
    });

    if (!shop) return next(createError(404, "Aucun magasin trouvé"));

    res.status(200).json({ message: "Magasin trouvé avec succès", data: shop });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error.message));
  }
};

const updateShop = async (req, res, next) => {
  try {
    const [updateRows] = await Shop.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateRows === 0) return next(createError(404, "Aucun magasin trouvé"));

    const updatedRows = await Shop.findOne({
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json({ message: "Magasin mis à jour avec succès", data: updatedRows });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const deletedShop = await Shop.destroy({
      where: { id: req.params.id },
    });

    if (!deletedShop) return next(createError(404, "Aucun magasin trouvé"));

    res.status(200).json({ message: "Magasin supprimé avec succès" });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

module.exports = {
  createShop,
  getAllShops,
  getShop,
  updateShop,
  deleteShop,
};
