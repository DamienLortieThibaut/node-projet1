const db = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User= require("../model/userModel")

exports.register = async (req, res) => {
  try {
    const { lastname, firstname, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ lastname, firstname, email, password: hash });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  };
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Assurez-vous que le modèle User est correctement importé

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Supposons que l'ID de l'utilisateur à modifier est transmis dans les paramètres de l'URL
    const { firstname, lastname ,email, password } = req.body;

    // Vérifier si l'utilisateur à modifier existe dans la base de données
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations de l'utilisateur
    if (lastname) {
      userToUpdate.lastname = lastname;;
    }
    if (firstname) {
        userToUpdate.firstname = firstname;
      }
    if (email) {
      userToUpdate.email = email;
    }
    if (password) {
      const hash = bcrypt.hashSync(password, 10);
      userToUpdate.password = hash;
    }

    // Sauvegarder les modifications dans la base de données
    await userToUpdate.save();

    res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification des informations de l\'utilisateur' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Supposons que l'ID de l'utilisateur à supprimer est transmis dans les paramètres de l'URL

    // Vérifier si l'utilisateur à supprimer existe dans la base de données
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur de la base de données
    await userToDelete.destroy();

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

