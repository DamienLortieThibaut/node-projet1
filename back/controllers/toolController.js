const Tool = require("../models/toolModel");

//--------- Create a tool ---------//
exports.createTool = async (req, res) => {
    try {
        const { prize, name, primary } = req.body;
        const tool = await Tool.create({ prize, name, primary });
        res.status(201).json(tool);
    } catch (error) {
        console.error('Erreur lors de la création de l\'outil:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'outil' });
    }
};

//--------- Get all tools ---------//

exports.getAllTools = async (req, res) => {
    try {
        const tools = await Tool.findAll();
        res.status(200).json(tools);
    } catch (error) {
        console.error('Erreur lors de la récupération des outils:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des outils' });
    }
}

//--------- Get a tool by id ---------//

exports.getToolById = async (req, res) => {
    const { id } = req.params;
    try {
        const tool = await Tool.findByPk(id);
        if (tool) {
            res.status(200).json(tool);
        } else {
            res.status(404).json({ error: 'Outil non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'outil:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'outil' });
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
            res.status(404).json({ error: 'Outil non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la modification de l\'outil:', error);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'outil' });
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
        res.status(404).json({ error: 'Outil non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'outil:', error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'outil' });
    }
  };

