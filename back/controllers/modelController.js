const Model = require("../models/modelModel");

// CREATE - Création d'un nouveau modèle
exports.createModel = async (req, res) => {
  const { name, description, prize } = req.body;
  try {
    const existingModel = await Model.findOne({ where: { name: name } });
    if (existingModel) {
      return res.status(400).json({ message: "Ce modèle existe déjà" });
    }
    await Model.create({
      name,
      description,
      prize,
    });
    res.status(200).json({ message: "Nouveau modèle créé" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du modèle",
      error: error.message,
    });
  }
};

// READ - Lecture de tous les modèles
exports.readModel = async (req, res) => {
  try {
    const models = await Model.findAll();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json("Erreur lors de la lecture des modèles:", error);
  }
};

// UPDATE - Mise à jour des informations d'un modèle
exports.updateModel = async (req, res) => {
  try {
    const modelId = req.params.id;
    
    const modelToUpdate = await Model.findByPk(modelId);
    if (modelToUpdate) {
      await modelToUpdate.update(req.body);
      res.status(200).json("Modèle mis à jour");
    } else {
      res.status(404).json("Modèle non trouvé.");
    }
  } catch (error) {
    res
      .status(500)
      .json("Erreur lors de la mise à jour des informations du modèle");
  }
};

// DELETE - Suppression d'un modèle
exports.deleteModel = async (req, res) => {
  const modelId = req.params.id
  try {
    const deletedRowCount = await Model.destroy({ where: { id: modelId } });
    if (deletedRowCount > 0) {
      res.status(200).json("Modèle supprimé avec succès.");
    } else {
      res.status(404).json("Modèle non trouvé ou déjà supprimé.");
    }
  } catch (error) {
    res.status(500).json("Erreur lors de la suppression du modèle:", error);
  }
};
