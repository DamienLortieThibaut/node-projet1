const db = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Model= require("../models/modelModel")

// CREATE - Création d'un nouveau modèle
exports.createModel = async (name, description, prize) => {
  try {
    const newModel = await Model.create({
      name,
      description,
      prize,
    });
    console.log('Nouveau modèle créé:', newModel.toJSON());
  } catch (error) {
    console.error('Erreur lors de la création du modèle:', error);
  }
};

// READ - Lecture de tous les modèles
exports.readModels = async () => {
  try {
    const models = await Model.findAll();
    console.log('Liste des modèles:');
    models.forEach((model) => {
      console.log(model.toJSON());
    });
  } catch (error) {
    console.error('Erreur lors de la lecture des modèles:', error);
  }
};

// UPDATE - Mise à jour des informations d'un modèle
exports.updateModel = async (modelId, newData) => {
  try {
    const modelToUpdate = await Model.findByPk(modelId);
    if (modelToUpdate) {
      await modelToUpdate.update(newData);
      console.log('Informations modèle mises à jour:', modelToUpdate.toJSON());
    } else {
      console.log('Modèle non trouvé.');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations du modèle:', error);
  }
};

// DELETE - Suppression d'un modèle
exports.deleteModel = async (modelId) => {
  try {
    const deletedRowCount = await Model.destroy({ where: { id: modelId } });
    if (deletedRowCount > 0) {
      console.log('Modèle supprimé avec succès.');
    } else {
      console.log('Modèle non trouvé ou déjà supprimé.');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du modèle:', error);
  }
};
