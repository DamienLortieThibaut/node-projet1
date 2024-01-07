const Model = require("../models/modelModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
exports.uploadImage = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("image");

// CREATE - Création d'un nouveau modèle
exports.createModel = async (req, res) => {
  const { name, description, prize } = req.body;
  console.log(name, description, prize);
  try {
    const existingModel = await Model.findOne({ where: { name: name } });
    if (existingModel) {
      return res.status(400).json({ message: "Ce modèle existe déjà" });
    }
    await Model.create({
      name,
      description,
      prize,
      image: req.file ? req.file.path : null,
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
    res
      .status(500)
      .json({
        message: "Erreur lors de la lecture des modèles:",
        error: error.message,
      });
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
  const modelId = req.params.id;
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

// GET ONE - Récupération d'un modèle par son ID
exports.getModelById = async (req, res) => {
  const modelId = req.params.id;
  try {
    const model = await Model.findByPk(modelId);
    if (model) {
      res.status(200).json(model);
    } else {
      res.status(404).json({ error: "Modèle non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération du modèle par ID",
        details: error.message,
      });
  }
};
