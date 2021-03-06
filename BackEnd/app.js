//declaration
const express = require("express");

const cors = require("cors");

const app = express();

//read cookie
const cookieParser = require("cookie-parser");

//struggle against injection  attacks and  cross-site scripting (XSS)
const sanitizeMiddleware = require("sanitize-middleware");

//use for file way (path)
const path = require("path");

// use to protect some http request,headers safety, sniffing, clickjacking... https://www.npmjs.com/package/helmet
const helmet = require("helmet");

// Limite nomber of request per IP
const rateLimit = require("./middleware/expressRateLimit-config");

// don't keep cache do get all update of the back end
const nocache = require("nocache");

//request http logger
const morgan = require("morgan");

/***********************
 **  Header - Setup    *
 **********************/

let corsOptions = {
  origin: process.env.HostFront,
  // methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// route utilisateurs pour stockage db
const userRoutes = require("./routes/User.rt");
const postRoutes = require("./routes/Post.rt");

const auth = require("./middleware/auth");

/********************
 **    App- Use     *
 *******************/

// Middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeMiddleware());
app.use(cors(corsOptions));
app.use(nocache());
app.use(helmet());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cookieParser());
// Routes
app.all("*", auth.checkUser);

app.use("/user", rateLimit, userRoutes);
app.use("/post", rateLimit, postRoutes);

module.exports = app;
