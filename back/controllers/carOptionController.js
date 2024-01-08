const CarOption = require("../models/carOptionModel");
const Model = require("../models/modelModel");
const Tool = require("../models/toolModel");

//--------- Create a carOption ---------//
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

//--------- Delete a carOption ---------//
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

//--------- Delete a carOption by Tool and Model id ---------//
exports.deleteByToolAndModelId = async (req, res) => {
  const toolId = req.params.toolId;
  const modelId = req.params.modelId;

  try {
    // Find CarOption based on toolId and modelId
    const carOption = await CarOption.findOne({
      where: {
        toolId: toolId,
        modelId: modelId,
      },
    });

    if (carOption) {
      // If found, remove the CarOption
      await carOption.destroy();
      res.status(200).json("CarOption successfully deleted");
    } else {
      // If not found, return a 404 error
      res.status(404).json({ error: "CarOption not found" });
    }
  } catch (error) {
    console.error("Error deleting CarOption: ", error);
    res.status(500).json({ error: "Error deleting CarOption" });
  }
};

//--------- Update a carOption by id---------//
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

//--------- Update a carOption by tool id and model id---------//
exports.updateByToolAndModelId = async (req, res) => {
  const toolId = req.body.toolId;
  const modelId = req.body.modelId;
  console.log(toolId, modelId)
  try {
    const carOption = await CarOption.findOne({
      where: {
        toolId: toolId,
        modelId: modelId,
      },
    });

    if (carOption) {
      await carOption.update(req.body);
      res.status(200).json(carOption);
    } else {
      res.status(404).json({ error: "CarOption not found" });
    }
  } catch (error) {
    console.error("Error updating CarOption: ", error);
    res.status(500).json({ error: "Error updating CarOption" });
  }
};

//--------- Get all carOption ---------//
exports.getAll = async (req, res) => {
  try {
    const result = await CarOption.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving purchases : ", error);
    res.status(500).json({ error: "Error retrieving purchases" });
  }
};

//--------- Get a carOption by id ---------//
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

//--------- Get a toolsdetails by model id ---------//
exports.getTools = async (req, res) => {
  const modelId = req.params.modelId;

  try {
    const carOptions = await CarOption.findAll({
      where: { modelId: modelId },
    });

    if (!carOptions || carOptions.length === 0) {
      return res
        .status(404)
        .json([]);
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

//--------- Get a modelsdetails by tool id ---------//
exports.getModels = async (req, res) => {
  const toolId = req.params.toolId;

  // Find all CarOptions based on the provided toolId
  try {
    const carOptions = await CarOption.findAll({
      where: { toolId: toolId },
    });

    // Check if CarOptions were found
    if (!carOptions || carOptions.length === 0) {
      return res
        .status(404)
        .json({ error: "CarOptions non trouvés pour l'ID d'outil donné" });
    }

    // Fetch details for each model associated with the found CarOptions
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
