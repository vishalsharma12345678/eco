const express = require("express");
const router = express.Router();

const passport = require("passport");
const AuthController = require("../Controller/auth");

router.get("/register", (req, res) => {
  res.render("auth/signup");
  console.log(req.user, "user");
});

router.post("/register", AuthController.sigup);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  AuthController.singin
);

router.get("/logout", AuthController.logout);

module.exports = router;
