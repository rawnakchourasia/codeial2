const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

// for using JS, CSS and Image files
app.use(express.static("./assets"));

// extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// using ExpressEjsLayouts
app.use(expressLayouts);

// use express router
app.use("/", require("./routes/index"));

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
