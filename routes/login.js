var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var connection = require("../config/db");
router.get("/", function (req, res, next) {
  res.render("login", {
    title: "Login",
    email: "",
    password: "",
  });
});
router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Login",
    email: "",
    password: "",
  });
});
router.post("/login", function (req, res, next) {
  req.assert("email", "A valid email is required").isEmail();
  req.assert("password", "Password is required").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      async function (err, rows, fields) {
        if (err) throw err;
        if (rows.length <= 0) {
          req.flash("error", "Please enter correct email.");
          res.redirect("/login");
        } else {
          password = await bcrypt.compare(password, rows[0].password);
          console.log("password", password);
          if (password) {
            req.session.loggedin = true;
            req.session.name = rows[0].name;
            res.redirect("/dashboard");
          } else {
            req.flash("error", "Please enter correct password.");
            res.redirect("/login");
          }
        }
      }
    );
  } else {
    req.flash("errors", errors);
    res.render("login", {
      title: "Login",
      email: "",
      password: "",
    });
  }
});
router.get("/logout", function (req, res) {
  req.flash("success", "Login Again Here");
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
