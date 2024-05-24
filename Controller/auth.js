const User = require("../models/user");
const register = async (req, res) => {
  try {
    let { email, username, password, role } = req.body;
    const user = new User({ email, username, role });
    const newUser = await User.register(user, password);
    // res.send(newUser);
    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome, you are registered successfully");
      return res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/products");
  }
};
const login = function (req, res) {
  // console.log(req.user);
  req.flash("success", `welcome back ${req.user.username}`);
  res.redirect("/products");
};
const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      req.flash("error", "error in logging out");
      return next(err);
    }
    req.flash("success", "goodbye friend");
    res.redirect("/login");
  });
};
module.exports = { sigup: register, singin: login, logout: logout };
