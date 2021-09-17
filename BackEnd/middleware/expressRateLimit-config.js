const rateLimit = require("express-rate-limit");

/****************************
 **  Request  controller    *
 ***************************/
//  limit all http request 

module.exports = rateLimit({
    windowMs: 1* 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
  });

 
