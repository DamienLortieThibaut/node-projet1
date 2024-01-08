const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

//--------- Create a user ---------//

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname, lastname, email, password)
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }
    const hash = await bcrypt.hashSync(password, 10);
    await User.create({
      firstname,
      lastname,
      email,
      password: hash,
    });
    // Renvoie jwt token pour la signature
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ token: token }); // Correction ici pour utiliser le statut 201
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};


//--------- Login a user ---------//

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    console.log(existingUser.dataValues)
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }
    const hash = bcrypt.compareSync(password, existingUser.password);
    if (!hash) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }
    const token = jwt.sign({ email:email, id: existingUser.dataValues.id, role: existingUser.role }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'authentification de l'utilisateur" });
  }
};

//--------- Get all users ---------//

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

//--------- Get a user by id ---------//

exports.getAllById = async (req, res) => {
  const userId  = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};

//--------- Update a user ---------//

exports.updateUser = async (req, res) => {
  try {
    const userId  = req.params.id; // Supposons que l'ID de l'utilisateur à modifier est transmis dans les paramètres de l'URL
    const { firstname, lastname, email, password } = req.body;

    // Vérifier si l'utilisateur à modifier existe dans la base de données
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations de l'utilisateur
    if (firstname) {
      userToUpdate.firstname = firstname;
    }
    if (lastname) {
      userToUpdate.lastname = lastname;
    }
    if (email) {
      userToUpdate.email = email;
    }
    if (password) {
      const hash = await bcrypt.hashSync(password, 10);
      userToUpdate.password = hash;
    }

    // Sauvegarder les modifications dans la base de données
    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "Informations utilisateur mises à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la modification des informations de l'utilisateur",
    });
  }
};

//--------- Delete a user ---------//

exports.deleteUser = async (req, res) => {
  try {
    const userId  = req.params.id; // Supposons que l'ID de l'utilisateur à supprimer est transmis dans les paramètres de l'URL

    // Vérifier si l'utilisateur à supprimer existe dans la base de données
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Supprimer l'utilisateur de la base de données
    await userToDelete.destroy();

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};
