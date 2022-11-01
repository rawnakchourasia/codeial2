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

// use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
