const CarOption = require("../models/carOptionModel");
const Model = require("../models/modelModel");
const Tool = require("../models/toolModel");

// CREATE du CRUD
exports.add = async (req, res) => {
  try {
    const buy = req.body;
    const result = await CarOption.create(buy);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding purchase recovery : ", error);
    res.status(500).json({ error: "Error adding purchase recovery" });
  }
};

// DELETE du CRUD
exports.delete = async (req, res) => {
  const getId = req.params.id;
  try {
    const result = await CarOption.findByPk(getId);
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

// UPDATE du CRUD
exports.update = async (req, res) => {
  const getId = req.params.id;
  const get = req.body;
  try {
    const result = await CarOption.findByPk(getId);
    if (result) {
      await result.update(get);
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Purchase not found" });
    }
  } catch (error) {
    console.error("Error updating purchase : ", error);
    res.status(500).json({ error: "Error updating purchase" });
  }
};

// Afficher les éléments
exports.getAll = async (req, res) => {
  try {
    const result = await CarOption.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving purchases : ", error);
    res.status(500).json({ error: "Error retrieving purchases" });
  }
};

// Afficher les éléments selon un id
exports.getById = async (req, res) => {
  const getId = req.params.id;
  try {
    const result = await CarOption.findByPk(getId);
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

// Chercher les Tools à partir de l'ID d'un Model
exports.getTools = async (req, res) => {
  const modelId = req.params.modelId;

  try {
    const carOptions = await CarOption.findAll({
      where: { modelId: modelId },
    });

    if (!carOptions || carOptions.length === 0) {
      return res
        .status(404)
        .json({ error: "CarOptions non trouvés pour l'ID de modèle donné" });
    }

    const toolsDetails = await Promise.all(
      carOptions.map(async (carOption) => {
        const tool = await Tool.findByPk(carOption.toolId);
        return {
          id: tool.id,
          prize: tool.prize,
          name: tool.name,
          is_primary: carOption.is_primary,
        };
      })
    );

    res.status(200).json(toolsDetails);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des outils par ID de modèle :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des outils par ID de modèle",
    });
  }
};

// Chercher les Models à partir de l'ID d'un Tools
exports.getModels = async (req, res) => {
  const toolId = req.params.toolId;

  try {
    const carOptions = await CarOption.findAll({
      where: { toolId: toolId },
    });

    if (!carOptions || carOptions.length === 0) {
      return res
        .status(404)
        .json({ error: "CarOptions non trouvés pour l'ID d'outil donné" });
    }

    const modelsDetails = await Promise.all(
      carOptions.map(async (carOption) => {
        const model = await Model.findByPk(carOption.modelId);
        return {
          id: model.id,
          name: model.name,
          description: model.description,
          prize: model.prize,
          image: model.image,
          is_primary: carOption.is_primary,
        };
      })
    );

    res.status(200).json(modelsDetails);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des modèles par ID d'outil :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des modèles par ID d'outil",
    });
  }
};
