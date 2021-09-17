const passwordSchema = require('../models/password.js');

/****************************
 **  Password controller    *
 ***************************/

 //from modele check the register password to make sure is strong enought 

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(
            400,
            'Merci de respecter les conditions suivantes concernant votre mot de passe : une majuscule, une minuscule, un caractère spécial, deux chiffres ainsi que 8 caractères au minimum.',
        ).end();
    } else {
        next();
    }
};