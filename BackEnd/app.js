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

 app.use((req, res, next) => {
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
//
const Sharp = require('./middleware/sharp-config');
const Multer = require('./middleware/multer-config');
// route utilisateurs pour stockage db 
const userRoute = require('./routes/User')
const post = require ('./routes/post')


/********************
 **    App- Use     *
 *******************/
app.use(cors());
app.use(express.json())
app.use("/user", userRoute);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());


module.exports = app;