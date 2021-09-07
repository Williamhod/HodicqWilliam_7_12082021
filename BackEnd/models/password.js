/*****************************************
 ** Model - Password norme messages *
 ****************************************/
const passwordValidator = require('password-validator');


const passwordSchema = new passwordValidator();

//* Password properties
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123'])  // Blacklist these values



module.exports = passwordSchema;

//source https://tarunbatra.com/password-validator/5.1.1/