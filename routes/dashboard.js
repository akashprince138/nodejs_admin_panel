var express = require("express");
var router = express.Router();
var connection = require("../config/db");
router.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    res.render("dashboard", {
      title: "Dashboard",
      name: req.session.name,
    });
  } else {
    req.flash("success", "Please login first!");
    res.redirect("/login");
  }
});
module.exports = router;
