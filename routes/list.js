var express = require("express");
var router = express.Router();
var connection = require("../config/db");
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      req.flash("error", err);
      res.redirect("/login");
    } else {
      console.log("result", result);
      res.render("list", {
        title: "User List",
        data: result,
        name: req.session.name,
      });
    }
  });
  if (!req.session.loggedin) {
    req.flash("success", "Please login first!");
    res.redirect("/login");
  }
});
module.exports = router;
