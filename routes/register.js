var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var connection = require("../config/db");
router.get("/", function (req, res, next) {
  res.render("register", {
    title: "Registration Page",
    name: "",
    email: "",
    password: "",
  });
});
router.post("/", async function (req, res, next) {
  req.assert("name", "Name is required").notEmpty();
  req.assert("email", "A valid email is required").isEmail();
  req.assert("password", "Password is required").notEmpty();
  req.assert("mobile", "Mobile number is required").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    var user = {
      name: req.sanitize("name").escape().trim(),
      email: req.sanitize("email").escape().trim(),
      password: req.sanitize("password").escape().trim(),
      mobile: req.sanitize("mobile").escape().trim(),
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    connection.query("INSERT INTO users SET ?", user, function (err, result) {
      if (err) {
        req.flash("error", err);
        res.render("register", {
          title: "Registration Page",
          name: "",
          password: "",
          email: "",
        });
      } else {
        req.flash("success", "You have successfully signup!");
        res.redirect("/login");
      }
    });
  } else {
    req.flash("errors", errors);
    res.render("register", {
      title: "Registration Page",
      name: req.body.name,
      email: req.body.email,
      password: "",
    });
  }
});
module.exports = router;
