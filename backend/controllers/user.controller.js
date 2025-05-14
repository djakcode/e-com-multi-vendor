const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../middlewares/error");
const ENV = require("../config");

// Create a new user
// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return next(createError(400, "Cet utilisateur existe déjà"));
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error));
  }
};

// Login user
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(createError(400, "L'email et le mot de passe sont requis"));
    }

    // Check if user exists
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return next(createError(404, "Utilisateur non trouvé"));
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(401, "Mot de passe incorrect"));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      ENV.TOKEN,
      {
        expiresIn: "24h",
      }
    );

    // Send response with user data and token except password
    const { password: _, ...userData } = user.dataValues;

    // Create a cookie with the token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Utilisateur connecté avec succès",
      user: {
        ...userData,
        access_token: token,
      },
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error));
  }
};

// get all users
// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: "Tous les utilisateurs trouvés avec succès",
      Utilisateurs: users,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur", error));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteRows = await User.findByPk({
      where: {
        id: req.params.id,
      },
    });

    // check if exist user
    if (deleteRows === 0)
      return next(createError(404, "L'utilisateur n'existe pas"));

    const deletedUser = await User.destroy(deleteRows);

    // send response
    res.status(200).json({
      message: "Utilisateur supprimé avec succès",
      data: deletedUser,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const [updateRows] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // check if exists user
    if (updateRows === 0)
      return next(createError(404, "Cet utilisateur n'existe pas"));

    const updatedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    // send response
    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      data: updatedUser,
    });
  } catch (error) {
    next(createError(500, "Erreur dans le serveur"));
  }
};

module.exports = {
  signup,
  signin,
  getUsers,
  deleteUser,
  updateUser,
  // Add other controller functions here (login, getUser, etc.)
};
