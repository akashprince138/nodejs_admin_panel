var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var flash = require("express-flash");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = require("./config/db");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var dashboardRouter = require("./routes/dashboard");
var listRouter = require("./routes/list");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(expressValidator());
app.use("/", loginRouter);
app.use("/register", registerRouter);
app.use("/dashboard", dashboardRouter);
app.use("/list", listRouter);
app.listen(8080, function () {
  console.log("Node app is running on port 8080");
});
module.exports = app;
