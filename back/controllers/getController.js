const Get = require('../models/getModel');
const Model = require('../models/modelModel');
const Tool = require('../models/toolModel');

// CREATE du CRUD
exports.add = async (req, res) => {
  try {
    const buy = req.body;
    const result = await Get.create(buy);
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
    const result = await Get.findByPk(getId);
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
    const result = await Get.findByPk(getId);
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
    const result = await Get.findAll();
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
    const result = await Get.findByPk(getId);
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

exports.getByModelId = async (req, res) => {
  const modelId = req.params.modelId;
  try {
    const result = await Get.findAll({
      where: { modelId: modelId },
      include: [
        { model: Model, as: 'model' },
        { model: Tool, as: 'tool' },
      ],
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Get not found' });
    }
  } catch (error) {
    console.error('Error retrieving Gets by Model ID:', error);
    res.status(500).json({ error: 'Error retrieving Gets by Model ID' });
  }
};

// Chercher les Get à partir de l'ID d'un Tool
exports.getByToolId = async (req, res) => {
  const toolId = req.params.toolId;
  try {
    const result = await Get.findAll({where: {toolId: toolId}});

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Get not found' });
    }
  } catch (error) {
    console.error('Error retrieving Gets by Tool ID:', error);
    res.status(500).json({ error: 'Error retrieving Gets by Tool ID' });
  }
};
