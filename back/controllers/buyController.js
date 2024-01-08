const Buy = require("../models/buyModel");
const User = require("../models/userModel");
const Model = require("../models/modelModel");
// Ajouter un nouvel achat
exports.add = async (req, res) => {
  try {
    const buy = req.body;
    const result = await Buy.create(buy);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding purchase recovery : ", error);
    res.status(500).json({ error: "Error adding purchase recovery" });
  }
};

// Supprimer un achat
exports.delete = async (req, res) => {
  const buyId = req.params.id;
  try {
    const result = await Buy.findByPk(buyId);
    if (result) {
      await result.destroy();
      res.status(200).json("Purchase successfully deleted");
    } else {
      res.status(404).json({ error: "Purchase not found" });
    }
  } catch (error) {
    console.error("Error deleting purchase : ", error);
    res.status(500).json({ error: "Error deleting purchase" });
  }
};

// Mise à jour d'un achat
exports.update = async (req, res) => {
  const buyId = req.params.id;
  const buy = req.body;
  try {
    const result = await Buy.findByPk(buyId);
    if (result) {
      await result.update(buy);
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Purchase not found" });
    }
  } catch (error) {
    console.error("Error updating purchase : ", error);
    res.status(500).json({ error: "Error updating purchase" });
  }
};

// Afficher tous les achats
exports.getAll = async (req, res) => {
  try {
    const results = await Buy.findAll();

    const buyDetails = await Promise.all(
      results.map(async (result) => {
        const model = await Model.findByPk(result.modelId);
        const user = await User.findByPk(result.userId);
        return {
          id: result.id,
          prize: result.prize,
          date: result.date,
          firstname: user.firstname,
          lastname: user.lastname,
          model: model.name,
        };
      })
    );

    res.status(200).json(buyDetails);
  } catch (error) {
    console.error("Erreur lors de la récupération des achats : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des achats" });
  }
};

// Récupérer un achat par id
exports.getById = async (req, res) => {
  const buyId = req.params.id;
  try {
    const result = await Buy.findByPk(buyId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Purchase not found" });
    }
  } catch (error) {
    console.error("Error retrieving the purchase:", error);
    res.status(500).json({ error: "Error retrieving the purchase" });
  }
};
