const Model = require("../models/modelModel");
const multer = require("multer");
const path = require("path");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded images
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded image with a timestamp prefix
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

exports.uploadImage = multer({
  storage: storage,
  // Limit the file size to 100 MB
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const fileTypes = /jpeg|jpg|png/;

    // Check if the file is mime type and extension match the allowed types
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      // Allow the upload if the file format is valid
      return cb(null, true);
    }

    // Reject the upload if the file format is invalid
    cb("Give proper files format to upload");
  },
}).single("image");

// CREATE - Create a new model
exports.createModel = async (req, res) => {
  const { name, description, prize } = req.body;
  try {
    // Check if a model with the same name already exists
    const existingModel = await Model.findOne({ where: { name: name } });
    if (existingModel) {
      return res.status(400).json({ message: "This model already exists" });
    }
    await Model.create({
      name,
      description,
      prize,
      image: req.file ? req.file.path : null,
    });
    res.status(200).json({ message: "New model created" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the model",
      error: error.message,
    });
  }
};

// READ - Get all models
exports.readModel = async (req, res) => {
  try {
    const models = await Model.findAll();
    res.status(200).json(models);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error reading models:",
        error: error.message,
      });
  }
};

// UPDATE - Update a model by id
exports.updateModel = async (req, res) => {
  try {
    const modelId = req.params.id;

    const modelToUpdate = await Model.findByPk(modelId);
    if (modelToUpdate) {
      await modelToUpdate.update(req.body);
      res.status(200).json("Model updated");
    } else {
      res.status(404).json("Model not found");
    }
  } catch (error) {
    res
      .status(500)
      .json("Error updating model information");
  }
};

// DELETE - Model
exports.deleteModel = async (req, res) => {
  const modelId = req.params.id;
  try {
    const deletedRowCount = await Model.destroy({ where: { id: modelId } });
    if (deletedRowCount > 0) {
      res.status(200).json("Successfully deleted template.");
    } else {
      res.status(404).json("Model not found or already deleted.");
    }
  } catch (error) {
    res.status(500).json("Error deleting model:", error);
  }
};

// GET ONE - Get by id
exports.getModelById = async (req, res) => {
  const modelId = req.params.id;
  try {
    const model = await Model.findByPk(modelId);
    if (model) {
      res.status(200).json(model);
    } else {
      res.status(404).json({ error: "Model not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error retrieving model by ID",
        details: error.message,
      });
  }
};
