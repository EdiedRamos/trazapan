const router = require("../utils/router.js");
const Login = require("../models/models.login");

router.post("/login", (req, res) => {
  const login = new Login(req, res);
  login.toLogin();
});

module.exports = router;
