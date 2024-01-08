const Tool = require("../models/toolModel");

//--------- Create a tool ---------//
exports.createTool = async (req, res) => {
  try {
    const { prize, name } = req.body;
    const tool = await Tool.create({ prize, name });
    res.status(201).json(tool);
  } catch (error) {
    console.error("Error when creating the tool : ", error);
    res.status(500).json({ error: "Error when creating the tool" });
  }
};

//--------- Get all tools ---------//
exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.findAll();
    res.status(200).json(tools);
  } catch (error) {
    console.error("Error retrieving tools:", error);
    res.status(500).json({ error: "Error retrieving tools" });
  }
};

//--------- Get a tool by id ---------//
exports.getToolById = async (req, res) => {
  const { id } = req.params;
  try {
    const tool = await Tool.findByPk(id);
    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json({ error: "Tool not found" });
    }
  } catch (error) {
    console.error("Error retrieving the tool:", error);
    res.status(500).json({ error: "Error retrieving the tool" });
  }
};

//--------- Update a tool ---------//

exports.updateTool = async (req, res) => {
  const { id } = req.params;
  try {
    const tool = await Tool.findByPk(id);
    if (tool) {
      await tool.update(req.body);
      res.status(200).json(tool);
    } else {
      res.status(404).json({ error: "Tool not found" });
    }
  } catch (error) {
    console.error("Error while modifying the tool:", error);
    res.status(500).json({ error: "Error while modifying the tool:" });
  }
};

//--------- Delete a tool ---------//

exports.deleteTool = async (req, res) => {
  const { id } = req.params;
  try {
    const tool = await Tool.findByPk(id);
    if (tool) {
      await tool.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Tool not found" });
    }
  } catch (error) {
    console.error("Error removing tool:", error);
    res.status(500).json({ error: "Error removing tool" });
  }
};
