const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

// SASS Middleware
const sassMidlleware = require("node-sass-middleware");

// Use sass Middleware before the server starts
app.use(
  sassMidlleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// for sending POST requests from FORMS
app.use(express.urlencoded());

// for cookies
app.use(cookieParser());

// for using JS, CSS and Image files
app.use(express.static("./assets"));

// extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// using ExpressEjsLayouts
app.use(expressLayouts);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// MongoStore is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    // TODO Change the secret before deploying in Production mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongo db setup ok");
      }
    ),
  })
);

// console.log("This is db - ", db);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// For flash messages after passport since it uses session cookies
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
