//declaration 
const express = require("express");
const cors = require('cors');

const app = express();
//use for upload file (as picture)
const multer = require('multer');

//use for file way (path)
const path = require('path');

// use to protect some http request,headers safety, sniffing, clickjacking... https://www.npmjs.com/package/helmet
const helmet = require("helmet");


/***********************
 **  Header - Setup    *
 **********************/

 app.use((_req, res, next) => {
   res.setHeader(`Access-Control-Allow-Origin`, process.env.HostFront); // Only our website have headers access
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
   );
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
   );
   next();
  });

let corsOptions = {
  origin: process.env.HostFront,
}
 
// route utilisateurs pour stockage db 
const userRoutes = require('./routes/User.rt')
const postRoutes = require('./routes/Post.rt')
const likeRoutes = require('./routes/Like.rt')

/********************
 **    App- Use     *
 *******************/

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/like", likeRoutes);


module.exports = app;