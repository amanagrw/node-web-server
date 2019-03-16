const exp = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = exp();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to file server.log");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});

app.use(exp.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMsg: "Welcome to our website"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.listen(3000);
