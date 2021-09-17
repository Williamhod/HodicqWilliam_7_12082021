const validator = require("validator");
const { isEmpty } = require("../utils/toolkit");
const passwordSchema = require("../models/password.js");

exports.checkRegister = (req, res, next) => {
  const { username, firstname, lastname } = req.body;

  const errorMessages = {};

  if (!validator.isAlphanumeric(username)) {
    errorMessages.username =
      "Merci de respecter les conditions suivantes concernant votre username : une majuscule, le reste en miniscule, pas de charactère spécial,";
  }
  if (!passwordSchema.validate(req.body.password)) {
    errorMessages.password =
      "Merci de respecter les conditions suivantes concernant votre mot de passe : une majuscule, une minuscule, un caractère spécial, deux chiffres ainsi que 8 caractères au minimum.";
  }
  if (!validator.isAlpha(firstname)) {
    errorMessages.firstname =
      "Merci de respecter les conditions suivantes concernant votre username : une majuscule, le reste en miniscule, pas de charactère spécial, ni de chiffre";
  }
  if (!validator.isAlpha(lastname)) {
    errorMessages.lastname =
      "Merci de respecter les conditions suivantes concernant votre username : une majuscule, le reste en miniscule, pas de charactère spécial, ni de chiffre";
  }

  if (!isEmpty(errorMessages)) {
    return res.status(400).json({ errorMessages });
  }

  next();
};
