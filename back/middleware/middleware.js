const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getEmailFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.email;
  } catch (error) {
    return null;
  }
};

exports.authenticator = (req, res, next) => {
  // Vérifier le token
  const token = req.params.token ? req.params.token : req.headers.authorization;
  // Décoder le token
  if (token && process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ erreur: "Access denied" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ erreur: "Access denied" });
  }
};

exports.isAdmin = async (req, res, next) => {
  const token = req.query.token || req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Access denied" });

  const email = getEmailFromToken(token);
  if (!email) {
    return res.status(401).json({ error: "Token invalid" });
  }

  try {
    const result = await User.findOne({ where: { email: email } });
    if (result.dataValues.role === "admin") {
      next();
    } else {
      res.status(403).json({ erreur: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server " });
  }
};

exports.isAccounter = async (req, res, next) => {
  const token = req.query.token || req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Access denied" });

  const email = getEmailFromToken(token);

  if (!email) {
    return res.status(401).json({ error: "Token invalid" });
  }

  try {
    const result = await User.findOne({ where: { email: email } });

    if (result.dataValues.role === "accounter") {
      next();
    } else {
      res.status(403).json({ erreur: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server" });
  }
};

exports.isAccounterOrAdmin = async (req, res, next) => {
  const token = req.query.token || req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Access denied" });

  const email = getEmailFromToken(token);

  if (!email) {
    return res.status(401).json({ error: "Token invalid" });
  }

  try {
    const result = await User.findOne({ where: { email: email } });
    console.log(result);
    if (
      result.dataValues.role === "accounter" ||
      result.dataValues.role === "admin"
    ) {
      next();
    } else {
      res.status(403).json({ erreur: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server" });
  }
};
