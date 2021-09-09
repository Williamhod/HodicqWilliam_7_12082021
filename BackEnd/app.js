//declaration 
const express = require("express");

const cors = require('cors');

const app = express();

//use for file way (path)
const path = require('path');

// use to protect some http request,headers safety, sniffing, clickjacking... https://www.npmjs.com/package/helmet
const helmet = require("helmet");

// Limite nomber of request per IP
const rateLimit = require('./middleware/expressRateLimit-config');

// don't keep cache do get all update of the back end
const nocache = require('nocache');

//request http logger
const morgan = require('morgan')

/***********************
 **  Header - Setup    *
 **********************/

 /* app.use((_req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, process.env.HostFront); // Only our website have headers access
    res.setHeader(
      "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
   });
*/

let corsOptions = {
  origin: process.env.HostFront,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}

// route utilisateurs pour stockage db 
const userRoutes = require('./routes/User.rt')
const postRoutes = require('./routes/Post.rt')

/********************
 **    App- Use     *
 *******************/

 
// Middlewares
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(cors(corsOptions));
app.use(nocache());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use("/user",rateLimit, userRoutes);
app.use("/post",rateLimit, postRoutes);


module.exports = app;